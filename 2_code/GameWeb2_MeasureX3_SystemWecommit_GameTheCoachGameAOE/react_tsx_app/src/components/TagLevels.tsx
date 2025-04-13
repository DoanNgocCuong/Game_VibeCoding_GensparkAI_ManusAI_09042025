import React from 'react';
import { Tag } from '../types';

interface TagLevelsProps {
  tags: Record<string, Tag>;
}

const TagLevels: React.FC<TagLevelsProps> = ({ tags }) => {
  const calculateXPProgress = (xp: number) => {
    const LEVEL_XP_BASE = 100;
    const LEVEL_XP_MULTIPLIER = 1.5;
    let level = 0;
    let totalXP = xp;
    let requiredXP = LEVEL_XP_BASE;
    
    while (totalXP >= requiredXP) {
      level++;
      totalXP -= requiredXP;
      requiredXP = Math.floor(LEVEL_XP_BASE * Math.pow(LEVEL_XP_MULTIPLIER, level));
    }
    
    return {
      currentXP: totalXP,
      requiredXP: requiredXP,
      percentage: (totalXP / requiredXP) * 100
    };
  };

  const sortedTags = Object.keys(tags).sort((a, b) => {
    if (tags[b].level !== tags[a].level) {
      return tags[b].level - tags[a].level;
    }
    return tags[b].xp - tags[a].xp;
  });

  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Level của Các Tag</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedTags.length === 0 ? (
          <div className="col-span-full text-center py-4 text-gray-500">
            Chưa có tag nào. Hãy thêm task mới để tạo tag!
          </div>
        ) : (
          sortedTags.map(tagName => {
            const tag = tags[tagName];
            const progress = calculateXPProgress(tag.xp);
            
            return (
              <div key={tagName} className="bg-gray-50 p-4 rounded-lg border">
                <div className="flex justify-between items-center">
                  <span
                    className="tag-pill"
                    style={{ backgroundColor: `${tag.color}33`, color: tag.color }}
                  >
                    {tagName}
                  </span>
                  <span className="text-indigo-700 font-bold">Level {tag.level}</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>XP: {tag.xp}</span>
                    <span>{progress.currentXP}/{progress.requiredXP}</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${progress.percentage}%`,
                        backgroundColor: tag.color
                      }}
                    />
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  <span>{tag.taskCount || 0} task đã hoàn thành</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TagLevels; 