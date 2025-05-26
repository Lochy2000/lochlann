import { motion } from 'framer-motion';

interface MarineStatsCardProps {
  icon: string;
  title: string;
  value: string;
  unit: string;
  description: string;
  trend: 'increasing' | 'decreasing' | 'stable' | 'positive' | 'growing' | 'expanding' | 'exploring';
  color: 'red' | 'orange' | 'green' | 'blue' | 'teal' | 'purple';
}

const MarineStatsCard: React.FC<MarineStatsCardProps> = ({
  icon,
  title,
  value,
  unit,
  description,
  trend,
  color
}) => {
  const colorClasses = {
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      icon: 'bg-red-100 dark:bg-red-900',
      text: 'text-red-600 dark:text-red-400',
      value: 'text-red-700 dark:text-red-300'
    },
    orange: {
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      border: 'border-orange-200 dark:border-orange-800',
      icon: 'bg-orange-100 dark:bg-orange-900',
      text: 'text-orange-600 dark:text-orange-400',
      value: 'text-orange-700 dark:text-orange-300'
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      icon: 'bg-green-100 dark:bg-green-900',
      text: 'text-green-600 dark:text-green-400',
      value: 'text-green-700 dark:text-green-300'
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      icon: 'bg-blue-100 dark:bg-blue-900',
      text: 'text-blue-600 dark:text-blue-400',
      value: 'text-blue-700 dark:text-blue-300'
    },
    teal: {
      bg: 'bg-teal-50 dark:bg-teal-900/20',
      border: 'border-teal-200 dark:border-teal-800',
      icon: 'bg-teal-100 dark:bg-teal-900',
      text: 'text-teal-600 dark:text-teal-400',
      value: 'text-teal-700 dark:text-teal-300'
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800',
      icon: 'bg-purple-100 dark:bg-purple-900',
      text: 'text-purple-600 dark:text-purple-400',
      value: 'text-purple-700 dark:text-purple-300'
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'increasing':
        return '📈';
      case 'decreasing':
        return '📉';
      case 'stable':
        return '➡️';
      case 'positive':
      case 'growing':
      case 'expanding':
      case 'exploring':
        return '⬆️';
      default:
        return '📊';
    }
  };

  const classes = colorClasses[color];

  return (
    <motion.div
      className={`${classes.bg} ${classes.border} border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`${classes.icon} p-3 rounded-lg`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="text-right">
          <span className="text-sm opacity-70">{getTrendIcon()}</span>
        </div>
      </div>
      
      <div className="mb-3">
        <h3 className="font-bold text-slate-800 dark:text-white mb-1">{title}</h3>
        <div className="flex items-baseline space-x-1">
          <span className={`text-2xl font-bold ${classes.value}`}>{value}</span>
          <span className={`text-sm ${classes.text} font-medium`}>{unit}</span>
        </div>
      </div>
      
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default MarineStatsCard;
