import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { plasticBySource, marineProtectionProgress, oceanThreats } from '@/data/marineConservation';

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];

const MarineCharts = () => {
  return (
    <div className="space-y-12">
      {/* Plastic Sources Chart */}
      <motion.div 
        className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-white">
          Sources of Ocean Plastic Pollution
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={plasticBySource}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                >
                  {plasticBySource.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {plasticBySource.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                ></div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700 dark:text-slate-300">{item.source}</span>
                    <span className="font-bold text-slate-800 dark:text-white">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-1">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${item.percentage}%`, 
                        backgroundColor: COLORS[index] 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Marine Protection Progress */}
      <motion.div 
        className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-white">
          Marine Protection Progress Toward 30x30 Goal
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={marineProtectionProgress}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="year" 
              stroke="#64748b"
              className="text-slate-600 dark:text-slate-300"
            />
            <YAxis 
              stroke="#64748b"
              className="text-slate-600 dark:text-slate-300"
              label={{ value: 'Ocean Protected (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: 'none', 
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="protected" 
              stroke="#22c55e" 
              strokeWidth={3}
              name="Currently Protected"
              dot={{ fill: '#22c55e', strokeWidth: 2, r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="#3b82f6" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Target (30% by 2030)"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center">
          <p className="text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-green-600">Current:</span> 8.1% protected • 
            <span className="font-semibold text-blue-600 ml-2">Goal:</span> 30% by 2030
          </p>
        </div>
      </motion.div>

      {/* Ocean Threats Severity */}
      <motion.div 
        className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-white">
          Ocean Threat Severity Assessment
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={oceanThreats} layout="vertical" margin={{ left: 140, right: 20, top: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              type="number" 
              domain={[0, 100]}
              stroke="#64748b"
              className="text-slate-600 dark:text-slate-300"
            />
            <YAxis 
              type="category" 
              dataKey="threat" 
              stroke="#64748b"
              className="text-slate-600 dark:text-slate-300"
              width={130}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: 'none', 
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value: any) => [`${value}%`, 'Severity Level']}
            />
            <Bar 
              dataKey="severity" 
              fill="#ef4444"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
            <div className="text-red-600 dark:text-red-400 font-bold text-lg">Critical</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">80-100% severity</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
            <div className="text-orange-600 dark:text-orange-400 font-bold text-lg">High</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">60-79% severity</div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
            <div className="text-yellow-600 dark:text-yellow-400 font-bold text-lg">Moderate</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">40-59% severity</div>
          </div>
        </div>
      </motion.div>

      {/* Key Statistics Summary */}
      <motion.div 
        className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-center mb-8">The Numbers That Matter</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">5.25T</div>
            <div className="text-blue-100">Pieces of plastic in oceans</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">100K</div>
            <div className="text-blue-100">Marine mammals killed annually</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">2050</div>
            <div className="text-blue-100">Year plastic may outweigh fish</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">$7.5B</div>
            <div className="text-blue-100">Cost to clean Pacific garbage patch</div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-blue-100 max-w-2xl mx-auto">
            These statistics represent both the challenge we face and the scale of action needed. 
            Every conservation effort, no matter how small, contributes to turning these numbers around.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default MarineCharts;
