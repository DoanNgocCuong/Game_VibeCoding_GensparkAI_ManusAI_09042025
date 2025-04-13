import { Tag } from '../store/slices/tagSlice';
import { calculateXPProgress, calculateStreakMultiplier, calculateMilestoneBonus } from '../utils/xpCalculator';

interface TagLevelsProps {
  tags: Record<string, Tag>;
}

const TagLevels = ({ tags }: TagLevelsProps) => {
  const sortedTags = Object.keys(tags).sort((a, b) => {
    if (tags[b].level !== tags[a].level) {
      return tags[b].level - tags[a].level;
    }
    return tags[b].xp - tags[a].xp;
  });

  // Log tag calculations
  console.log('=== Tag Level Calculations ===');
  sortedTags.forEach(tagName => {
    const tag = tags[tagName];
    const streakMultiplier = calculateStreakMultiplier(tag.streakDays || 0);
    const progress = calculateXPProgress(tag.xp, tag.streakDays || 0);
    const milestoneBonus = calculateMilestoneBonus((tag.streakDays || 0) / 365);
    
    console.log(`\nTag: ${tagName}`);
    console.log('Base XP:', tag.xp);
    console.log('Streak Days:', tag.streakDays || 0);
    console.log('Streak Multiplier:', streakMultiplier);
    console.log('Total XP (after multiplier):', Math.floor(tag.xp * streakMultiplier));
    console.log('Current Level:', progress.level);
    console.log('Current XP in Level:', progress.currentXP);
    console.log('Required XP for Next Level:', progress.requiredXP);
    console.log('Progress Percentage:', progress.percentage.toFixed(2) + '%');
    console.log('Milestone Bonus:', milestoneBonus);
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Level của Các Tag</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedTags.length === 0 ? (
          <div className="col-span-full text-center py-4 text-gray-500">
            Chưa có tag nào. Hãy thêm task mới để tạo tag!
          </div>
        ) : (
          sortedTags.map(tagName => {
            const tag = tags[tagName];
            const streakMultiplier = calculateStreakMultiplier(tag.streakDays || 0);
            const progress = calculateXPProgress(tag.xp, tag.streakDays || 0);
            const milestoneBonus = calculateMilestoneBonus((tag.streakDays || 0) / 365);
            
            return (
              <div key={tagName} className="bg-gray-50 p-4 rounded-lg border">
                <div className="flex justify-between items-center">
                  <span
                    className="tag-pill"
                    style={{
                      backgroundColor: `${tag.color}33`,
                      color: tag.color,
                    }}
                  >
                    {tagName}
                  </span>
                  <span className="text-indigo-700 font-bold">Level {progress.level}</span>
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
                        backgroundColor: tag.color,
                      }}
                    />
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500 space-y-1">
                  <div>
                    <span>{tag.taskCount || 0} task đã hoàn thành</span>
                  </div>
                  <div>
                    <span>Streak: {tag.streakDays || 0} ngày (x{streakMultiplier})</span>
                  </div>
                  {milestoneBonus > 0 && (
                    <div className="text-green-600">
                      <span>Bonus mốc: +{milestoneBonus} XP</span>
                    </div>
                  )}
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