import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaFilter, FaTags, FaCalendarAlt, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

interface Category {
  name: string;
  slug: string;
  color: string;
}

interface FilterDropdownProps {
  categories: Category[];
  selectedCategory: string;
  selectedSort: string;
  selectedFilter: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  onFilterChange: (filter: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  categories,
  selectedCategory,
  selectedSort,
  selectedFilter,
  onCategoryChange,
  onSortChange,
  onFilterChange
}) => {
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: FaSortAmountDown },
    { value: 'oldest', label: 'Oldest First', icon: FaSortAmountUp },
    { value: 'featured', label: 'Featured', icon: FaCalendarAlt },
    { value: 'popular', label: 'Most Popular', icon: FaFilter }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Posts' },
    { value: 'coding', label: 'Coding' },
    { value: 'hacking', label: 'Hacking' },
    { value: 'tutorials', label: 'Tutorials' },
    { value: 'tools', label: 'Tools' },
    { value: 'coffee-thoughts', label: 'Coffee Thoughts' }
  ];

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { duration: 0.15 }
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  };

  const getCurrentCategoryName = () => {
    const category = categories.find(cat => cat.slug === selectedCategory);
    return category ? category.name : 'All Categories';
  };

  const getCurrentSortName = () => {
    const sort = sortOptions.find(opt => opt.value === selectedSort);
    return sort ? sort.label : 'Newest First';
  };

  const getCurrentFilterName = () => {
    const filter = filterOptions.find(opt => opt.value === selectedFilter);
    return filter ? filter.label : 'All Posts';
  };

  return (
    <div className="blog-filter-dropdown flex flex-wrap gap-4 items-center justify-center mb-8 relative z-50">
      {/* Categories Dropdown */}
      <div className="relative z-50">
        <button
          onClick={() => {
            setCategoryDropdownOpen(!categoryDropdownOpen);
            setFilterDropdownOpen(false);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 text-white border border-purple-500/30 rounded-lg hover:bg-slate-700/90 hover:border-purple-400/50 transition-all duration-200 shadow-neon min-w-[160px] justify-between relative z-50"
        >
          <div className="flex items-center gap-2">
            <FaTags className="text-purple-400" />
            <span className="font-medium">{getCurrentCategoryName()}</span>
          </div>
          <FaChevronDown 
            className={`text-purple-400 transition-transform duration-200 ${
              categoryDropdownOpen ? 'rotate-180' : ''
            }`} 
          />
        </button>

        <AnimatePresence>
          {categoryDropdownOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="dropdown-menu fixed top-auto left-auto mt-2 w-64 bg-slate-800/95 backdrop-blur-sm border border-purple-500/30 rounded-lg shadow-neon-lg z-[99999] overflow-hidden"
              style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                zIndex: 99999,
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
              <div className="max-h-80 overflow-y-auto">
                {categories.map((category) => (
                  <button
                    key={category.slug}
                    onClick={() => {
                      onCategoryChange(category.slug);
                      setCategoryDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-slate-700/70 transition-colors duration-150 flex items-center gap-3 ${
                      selectedCategory === category.slug 
                        ? 'bg-purple-600/30 text-purple-300 border-l-2 border-purple-400' 
                        : 'text-slate-300'
                    }`}
                  >
                    <div 
                      className={`w-3 h-3 rounded-full ${category.color}`}
                    />
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sort Dropdown */}
      <div className="relative z-50">
        <button
          onClick={() => {
            setFilterDropdownOpen(!filterDropdownOpen);
            setCategoryDropdownOpen(false);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 text-white border border-blue-500/30 rounded-lg hover:bg-slate-700/90 hover:border-blue-400/50 transition-all duration-200 shadow-neon min-w-[140px] justify-between relative z-50"
        >
          <div className="flex items-center gap-2">
            <FaFilter className="text-blue-400" />
            <span className="font-medium">{getCurrentSortName()}</span>
          </div>
          <FaChevronDown 
            className={`text-blue-400 transition-transform duration-200 ${
              filterDropdownOpen ? 'rotate-180' : ''
            }`} 
          />
        </button>

        <AnimatePresence>
          {filterDropdownOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="dropdown-menu fixed top-auto left-auto mt-2 w-56 bg-slate-800/95 backdrop-blur-sm border border-blue-500/30 rounded-lg shadow-neon-lg z-[99999] overflow-hidden"
              style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                zIndex: 99999,
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
              <div className="py-2">
                <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-600/50">
                  Sort By
                </div>
                {sortOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => {
                        onSortChange(option.value);
                        setFilterDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-slate-700/70 transition-colors duration-150 flex items-center gap-3 ${
                        selectedSort === option.value 
                          ? 'bg-blue-600/30 text-blue-300' 
                          : 'text-slate-300'
                      }`}
                    >
                      <IconComponent className="text-blue-400" />
                      <span>{option.label}</span>
                    </button>
                  );
                })}
                
                <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-t border-slate-600/50 mt-2">
                  Filter By
                </div>
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onFilterChange(option.value);
                      setFilterDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-slate-700/70 transition-colors duration-150 ${
                      selectedFilter === option.value 
                        ? 'bg-blue-600/30 text-blue-300' 
                        : 'text-slate-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Clear Filters Button */}
      {(selectedCategory !== 'all' || selectedSort !== 'newest' || selectedFilter !== 'all') && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => {
            onCategoryChange('all');
            onSortChange('newest');
            onFilterChange('all');
          }}
          className="px-3 py-2 text-sm bg-red-600/80 text-white border border-red-500/30 rounded-lg hover:bg-red-500/90 transition-all duration-200"
        >
          Clear Filters
        </motion.button>
      )}
    </div>
  );
};

export default FilterDropdown;