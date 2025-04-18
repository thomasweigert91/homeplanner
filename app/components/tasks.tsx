import { AnimatePresence, motion } from "motion/react";
import { Button } from "./ui/button";
import {
  AlarmClockCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Calendar,
} from "lucide-react";
import { useState } from "react";

export const Tasks = ({ tasks, onDelete }) => {
  return (
    <motion.div layout className="grid grid-cols-1 gap-4">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onDelete={onDelete} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

const TaskCard = ({ task, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Datum formatieren und Gültigkeit prüfen
  let dateDisplay = "Kein Datum";
  let isValidDate = false;

  try {
    const date = new Date(task.dueDate);
    if (!isNaN(date.getTime())) {
      dateDisplay = date.toLocaleDateString();
      isValidDate = true;
    } else {
      dateDisplay = "Kein Datum";
    }
  } catch (e) {
    dateDisplay = "Kein Datum";
  }

  const hasDescription = task.description && task.description.trim().length > 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        opacity: { duration: 0.1 },
        y: { duration: 0.2 },
        height: { duration: 0.3 },
        layout: { duration: 0.3, type: "spring", stiffness: 300, damping: 25 },
      }}
      className="border-2 rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow"
    >
      <div
        className={`p-4 flex items-center justify-between ${hasDescription ? "cursor-pointer" : ""}`}
        onClick={() => hasDescription && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3 flex-grow">
          <div className="flex-shrink-0">
            <AlarmClockCheck
              className="text-blue-500 dark:text-blue-400"
              size={24}
            />
          </div>

          <div className="flex-grow min-w-0">
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 truncate">
              {task.title}
            </h3>

            <div className="flex items-center mt-1 gap-2">
              <span
                className={`inline-flex items-center gap-1 text-sm font-medium px-2.5 py-1 rounded-full
                ${
                  isValidDate
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                }`}
              >
                <Calendar size={14} />
                {dateDisplay}
              </span>

              {hasDescription && (
                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  {isExpanded ? (
                    <>
                      <ChevronUp size={16} className="mr-1" />
                      Details ausblenden
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} className="mr-1" />
                      Details anzeigen
                    </>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task._id);
          }}
          variant="outline"
          size="icon"
          className="flex-shrink-0 h-10 w-10 rounded-full border-green-200 bg-green-50 hover:bg-green-100 hover:text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:hover:bg-green-900 dark:hover:text-green-300 ml-3"
        >
          <CheckCircle2 size={18} />
        </Button>
      </div>

      {hasDescription && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-4 pt-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
                <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line">
                  {task.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
};
