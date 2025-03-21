import { motion } from 'framer-motion';
import { FC } from 'react';
import { BiCategory } from 'react-icons/bi';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

type CCategoryItemProps = {
  name: string;
  totalJobs: number;
  onPress: () => void;
};

const CCategoryItem: FC<CCategoryItemProps> = ({
  name,
  totalJobs,
  onPress,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1, opacity: 0.9 }}
      transition={{ duration: 0.3 }}
      className="shadow-xl ring-1 ring-gray-900/5 p-8 bg-white/30 backdrop-blur-xl cursor-pointer transition-colors group hover:border-primary hover:bg-blue-600  hover:text-white"
      onClick={onPress}
    >
      <BiCategory className="w-12 h-12 text-primary group-hover:text-white" />

      <div className="mt-7">
        <div className="text-2xl font-semibold">{name}</div>

        <div className="text-muted-foreground inline-flex items-center gap-1 mt-1 group-hover:text-white">
          <span>{totalJobs} jobs available</span>
          <HiOutlineArrowNarrowRight className="hover:text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default CCategoryItem;
