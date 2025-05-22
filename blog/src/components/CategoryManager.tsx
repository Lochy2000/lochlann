import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaPalette } from 'react-icons/fa';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { firebaseBlogService, type Category } from '../utils/firebaseBlogService';

interface CategoryManagerProps {
  onCategoryCreated?: (category: Category) => void;
}

// Available color options for categories
const colorOptions = [
  { value: 'bg-blue-500', label: 'Blue', preview: '#3B82F6' },
  { value: 'bg-green-500', label: 'Green', preview: '#10B981' },
  { value: 'bg-red-500', label: 'Red', preview: '#EF4444' },
  { value: 'bg-purple-500', label: 'Purple', preview: '#8B5CF6' },
  { value: 'bg-yellow-500', label: 'Yellow', preview: '#F59E0B' },
  { value: 'bg-pink-500', label: 'Pink', preview: '#EC4899' },
  { value: 'bg-indigo-500', label: 'Indigo', preview: '#6366F1' },
  { value: 'bg-orange-500', label: 'Orange', preview: '#F97316' },
  { value: 'bg-teal-500', label: 'Teal', preview: '#14B8A6' },
  { value: 'bg-coffee', label: 'Coffee', preview: '#8B4513' }
];

const CategoryManager: React.FC<CategoryManagerProps> = ({ onCategoryCreated }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<Omit<Category, 'id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    slug: '',
    color: 'bg-blue-500',
    description: ''
  });

  const queryClient = useQueryClient();

  // Fetch categories
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => firebaseBlogService.getCategories()
  });

  // Create category mutation
  const createCategoryMutation = useMutation({
    mutationFn: (category: Omit<Category, 'id'>) => firebaseBlogService.createCategory(category),
    onSuccess: (newCategory) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      setShowCreateForm(false);
      setFormData({ name: '', slug: '', color: 'bg-blue-500', description: '' });
      onCategoryCreated?.(newCategory);
    },
    onError: (error: any) => {
      alert(`Error creating category: ${error.message}`);
    }
  });

  // Update category mutation
  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: string } & Partial<Category>) => 
      firebaseBlogService.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      setEditingCategory(null);
    },
    onError: (error: any) => {
      alert(`Error updating category: ${error.message}`);
    }
  });

  // Delete category mutation
  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => firebaseBlogService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
    onError: (error: any) => {
      alert(`Error deleting category: ${error.message}`);
    }
  });

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
  };

  // Handle form field changes
  const handleFieldChange = (field: keyof Category, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Auto-generate slug when name changes
      ...(field === 'name' && { slug: generateSlug(value) })
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Category name is required');
      return;
    }

    if (editingCategory) {
      updateCategoryMutation.mutate({ 
        id: editingCategory.id!, 
        ...formData 
      });
    } else {
      createCategoryMutation.mutate(formData);
    }
  };

  // Start editing a category
  const startEditing = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      color: category.color,
      description: category.description || ''
    });
    setShowCreateForm(true);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingCategory(null);
    setShowCreateForm(false);
    setFormData({ name: '', slug: '', color: 'bg-blue-500', description: '' });
  };

  // Handle delete
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the category "${name}"? This action cannot be undone.`)) {
      deleteCategoryMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Category Management
        </h2>
        
        {!showCreateForm && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaPlus /> Add Category
          </button>
        )}
      </div>

      {/* Create/Edit Form */}
      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 mb-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
              {editingCategory ? 'Edit Category' : 'Create New Category'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    value={formData.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    placeholder="e.g., Web Development"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    value={formData.slug}
                    onChange={(e) => handleFieldChange('slug', e.target.value)}
                    placeholder="auto-generated from name"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  rows={2}
                  value={formData.description}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  placeholder="Brief description of this category"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <FaPalette className="inline mr-1" /> Category Color
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {colorOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleFieldChange('color', option.value)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        formData.color === option.value 
                          ? 'border-blue-500 scale-105' 
                          : 'border-slate-300 dark:border-slate-600 hover:border-slate-400'
                      }`}
                    >
                      <div 
                        className="w-full h-6 rounded"
                        style={{ backgroundColor: option.preview }}
                      />
                      <div className="text-xs mt-1 text-slate-600 dark:text-slate-400">
                        {option.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <FaTimes /> Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={createCategoryMutation.isPending || updateCategoryMutation.isPending}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <FaSave /> 
                  {createCategoryMutation.isPending || updateCategoryMutation.isPending 
                    ? 'Saving...' 
                    : editingCategory ? 'Update' : 'Create'
                  }
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories?.map((category) => (
          <motion.div
            key={category.id}
            layout
            className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${category.color}`} />
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {category.name}
                </h3>
              </div>
              
              <div className="flex gap-1">
                <button
                  onClick={() => startEditing(category)}
                  className="p-1 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                  title="Edit category"
                >
                  <FaEdit />
                </button>
                
                <button
                  onClick={() => handleDelete(category.id!, category.name)}
                  className="p-1 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                  title="Delete category"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              {category.description || 'No description'}
            </p>
            
            <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-500">
              <span>Slug: {category.slug}</span>
              <span>{category.postCount || 0} posts</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      {categories?.length === 0 && (
        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
          No categories found. Create your first category!
        </div>
      )}
    </div>
  );
};

export default CategoryManager;