import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import MarineStatsCard from '@/components/marine/MarineStatsCard';
import ConservationInitiative from '@/components/marine/ConservationInitiative';
import MarineCharts from '@/components/marine/MarineCharts';
import { marineStats, conservationEfforts } from '@/data/marineConservation';

const MarineConservation = () => {
  const [selectedTab, setSelectedTab] = useState<'crisis' | 'solutions'>('crisis');

  return (
    <>
      <Helmet>
        <title>Marine Conservation | Lochlann O'Higgins</title>
        <meta name="description" content="Explore marine conservation efforts, ocean statistics, and environmental initiatives that Lochlann supports through diving and conservation work." />
      </Helmet>

      <div className="mt-16">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: 'url("https://res.cloudinary.com/dpw2txejq/image/upload/v1748281105/2f75a360-f2d9-45ce-9ef0-e79507261f4d.png")',
                filter: 'brightness(0.7)'
              }}
            ></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Marine Conservation:
                <span className="block text-teal-300">Our Ocean's Future</span>
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed">
                As someone passionate about diving and snorkeling, I've witnessed both the beauty 
                and the fragility of our marine ecosystems. Here's what the data tells us about our oceans' 
                current state and the hope for recovery.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3">
                  <span className="font-semibold">🤿 Diving Enthusiast</span>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3">
                  <span className="font-semibold">🌊 Ocean Advocate</span>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3">
                  <span className="font-semibold">🐠 Marine Life Lover</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="py-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                {[
                  { id: 'crisis', label: 'The Crisis', icon: '🚨' },
                  { id: 'solutions', label: 'Solutions', icon: '🛡️' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id as any)}
                    className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                      selectedTab === tab.id
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        {selectedTab === 'crisis' && (
          <section className="py-16 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-4">
              <SectionTitle
                title={<>The Ocean <span className="text-red-500">Crisis</span></>}
                subtitle="Understanding the scale of marine pollution and its devastating impact on our ecosystems."
              />

              {/* Statistics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {marineStats.crisis.map((stat, index) => (
                  <MarineStatsCard 
                    key={index} 
                    icon={stat.icon}
                    title={stat.title}
                    value={stat.value}
                    unit={stat.unit}
                    description={stat.description}
                    trend={stat.trend as 'increasing' | 'decreasing' | 'stable' | 'positive' | 'growing' | 'expanding' | 'exploring'}
                    color={stat.color as 'red' | 'orange' | 'green' | 'blue' | 'teal' | 'purple'}
                  />
                ))}
              </div>

              {/* Data Visualization */}
              <MarineCharts />

              {/* Critical Issues */}
              <div className="mt-16">
                <h3 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-white">
                  Critical Issues Facing Our Oceans
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div 
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg mr-4">
                        <span className="text-2xl">🏭</span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-800 dark:text-white">Plastic Pollution</h4>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mb-3">
                      Over 11 million tonnes of plastic enter our oceans annually, equivalent to dumping 
                      2,000 garbage trucks of plastic every single day.
                    </p>
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                      <span className="text-sm font-medium text-red-700 dark:text-red-300">
                        💡 By 2050, there could be more plastic than fish in our oceans
                      </span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg mr-4">
                        <span className="text-2xl">🌡️</span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-800 dark:text-white">Climate Change</h4>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mb-3">
                      Rising sea temperatures and ocean acidification are causing mass coral bleaching 
                      events and disrupting marine food chains worldwide.
                    </p>
                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                      <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                        💡 Over 40% of coral reefs have been lost in the past 40 years
                      </span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg mr-4">
                        <span className="text-2xl">🎣</span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-800 dark:text-white">Overfishing</h4>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mb-3">
                      Unsustainable fishing practices have led to the collapse of many fish populations, 
                      with over 1 million marine animals dying annually from plastic pollution.
                    </p>
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                      <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                        💡 405 dead zones exist worldwide due to nutrient pollution
                      </span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mr-4">
                        <span className="text-2xl">🏭</span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-800 dark:text-white">Chemical Pollution</h4>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mb-3">
                      Industrial runoff, fertilizers, and untreated sewage continue to contaminate marine 
                      environments, creating toxic conditions for marine life.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        💡 80% of marine pollution comes from land-based activities
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        )}

        {selectedTab === 'solutions' && (
          <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto px-4">
              <SectionTitle
                title={<>Conservation <span className="text-green-600">Solutions</span></>}
                subtitle="Inspiring initiatives and proven strategies that are making a real difference in ocean health."
              />

              {/* Success Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {marineStats.solutions.map((stat, index) => (
                  <MarineStatsCard 
                    key={index} 
                    icon={stat.icon}
                    title={stat.title}
                    value={stat.value}
                    unit={stat.unit}
                    description={stat.description}
                    trend={stat.trend as 'increasing' | 'decreasing' | 'stable' | 'positive' | 'growing' | 'expanding' | 'exploring'}
                    color={stat.color as 'red' | 'orange' | 'green' | 'blue' | 'teal' | 'purple'}
                  />
                ))}
              </div>

              {/* Conservation Initiatives */}
              <div className="mb-16">
                <h3 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-white">
                  Leading Conservation Efforts
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {conservationEfforts.map((effort, index) => (
                    <ConservationInitiative 
                      key={index} 
                      title={effort.title}
                      description={effort.description}
                      image={effort.image}
                      impact={effort.impact}
                      status={effort.status as 'Active' | 'Ongoing' | 'In Progress' | 'Expanding'}
                      website={effort.website}
                      achievements={effort.achievements}
                    />
                  ))}
                </div>
              </div>

              {/* Action Items */}
              <motion.div 
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-white">
                  How You Can Make a Difference
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: '♻️', title: 'Reduce Plastic Use', desc: 'Choose reusable alternatives and support plastic-free initiatives' },
                    { icon: '🏖️', title: 'Beach Cleanups', desc: 'Join local cleanup events or organize your own community efforts' },
                    { icon: '🐟', title: 'Sustainable Seafood', desc: 'Support MSC-certified fisheries and responsible aquaculture' },
                    { icon: '💧', title: 'Water Conservation', desc: 'Reduce runoff and chemical pollution from land-based sources' },
                    { icon: '🏛️', title: 'Support MPAs', desc: 'Advocate for marine protected areas in your region' },
                    { icon: '📚', title: 'Education', desc: 'Share knowledge and raise awareness about ocean issues' }
                  ].map((action, index) => (
                    <motion.div 
                      key={index}
                      className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <span className="text-3xl mb-3 block">{action.icon}</span>
                      <h4 className="font-bold text-slate-800 dark:text-white mb-2">{action.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{action.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-blue-900 to-teal-800 text-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Join the Ocean Conservation Movement
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Every action counts. Whether you're a fellow diver, environmental enthusiast, 
                or simply someone who cares about our planet's future, there are ways to make a difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  className="px-8 py-3 bg-white text-blue-900 rounded-full font-semibold hover:bg-blue-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Involved
                </motion.a>
                <motion.a
                  href="https://www.wri.org/insights/opportunities-ocean-action-2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="py-12 bg-slate-100 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">
                📊 Real-Time Data Integration
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                The statistics displayed on this page are gathered from multiple authoritative sources and APIs, 
                ensuring you get the most current information about ocean health and conservation efforts.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="bg-white dark:bg-slate-700 rounded-lg p-4">
                  <div className="font-semibold text-blue-600 dark:text-blue-400 mb-2">🌊 Ocean Data</div>
                  <div className="text-slate-600 dark:text-slate-300">World Resources Institute & UNEP APIs</div>
                </div>
                <div className="bg-white dark:bg-slate-700 rounded-lg p-4">
                  <div className="font-semibold text-green-600 dark:text-green-400 mb-2">♻️ Cleanup Progress</div>
                  <div className="text-slate-600 dark:text-slate-300">The Ocean Cleanup & partner organizations</div>
                </div>
                <div className="bg-white dark:bg-slate-700 rounded-lg p-4">
                  <div className="font-semibold text-purple-600 dark:text-purple-400 mb-2">🛡️ Protected Areas</div>
                  <div className="text-slate-600 dark:text-slate-300">NOAA & Marine Conservation APIs</div>
                </div>
                <div className="bg-white dark:bg-slate-700 rounded-lg p-4">
                  <div className="font-semibold text-orange-600 dark:text-orange-400 mb-2">📈 Live Updates</div>
                  <div className="text-slate-600 dark:text-slate-300">Integrated via MARINE_API service</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
                Data refreshed regularly from official marine research institutions and conservation organizations
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MarineConservation;
