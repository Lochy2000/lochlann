import { motion } from 'framer-motion';

interface TimelineItemProps {
  position: number;
  date: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  position,
  date,
  title,
  company,
  description,
  skills,
}) => {
  return (
    <motion.div 
      className="timeline-item relative ml-6 md:ml-0 mb-12 md:grid md:grid-cols-12 md:gap-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: position * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="hidden md:block md:col-span-4 text-right pr-8 pt-5">
        <span className="text-primary-light font-mono text-sm">{date}</span>
        <h4 className="font-space font-bold text-white">{title}</h4>
        <p className="text-slate-300 text-sm">{company}</p>
      </div>
      
      <div className="md:col-span-8 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-primary/30 transition-all duration-300">
        <div className="md:hidden mb-3">
          <span className="text-primary-light font-mono text-sm">{date}</span>
          <h4 className="font-space font-bold text-white">{title}</h4>
          <p className="text-slate-300 text-sm">{company}</p>
        </div>
        <p className="text-slate-300">
          {description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span key={index} className="px-2 py-1 rounded-full bg-primary/20 text-primary-light text-xs">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
