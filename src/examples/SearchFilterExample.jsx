import { useState, useMemo } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useTheme } from '../contexts/ThemeContext';

const dummyCards = [
  {
    id: 1,
    title: 'React Development',
    category: 'Frontend',
    tags: ['React', 'JavaScript', 'Hooks'],
    description: 'Build modern web applications with React and hooks',
    rating: 4.8
  },
  {
    id: 2,
    title: 'Node.js Backend',
    category: 'Backend',
    tags: ['Node.js', 'Express', 'API'],
    description: 'Create robust server-side applications with Node.js',
    rating: 4.6
  },
  {
    id: 3,
    title: 'Database Design',
    category: 'Database',
    tags: ['SQL', 'PostgreSQL', 'Design'],
    description: 'Learn database design principles and optimization',
    rating: 4.7
  },
  {
    id: 4,
    title: 'UI/UX Design',
    category: 'Design',
    tags: ['Figma', 'Design', 'User Experience'],
    description: 'Create beautiful and intuitive user interfaces',
    rating: 4.9
  },
  {
    id: 5,
    title: 'Python Programming',
    category: 'Backend',
    tags: ['Python', 'Django', 'Programming'],
    description: 'Master Python programming for web development',
    rating: 4.5
  },
  {
    id: 6,
    title: 'CSS Animations',
    category: 'Frontend',
    tags: ['CSS', 'Animation', 'Web'],
    description: 'Create smooth and engaging CSS animations',
    rating: 4.4
  }
];

const categories = ['All', 'Frontend', 'Backend', 'Database', 'Design'];

export const SearchFilterExample = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minRating, setMinRating] = useState(0);

  const filteredCards = useMemo(() => {
    return dummyCards.filter(card => {
      const matchesSearch = 
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || card.category === selectedCategory;
      
      const matchesRating = card.rating >= minRating;
      
      return matchesSearch && matchesCategory && matchesRating;
    });
  }, [searchTerm, selectedCategory, minRating]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setMinRating(0);
  };

  return (
    <Card
      title="Search & Filter Example"
      subtitle={`Showing ${filteredCards.length} of ${dummyCards.length} cards`}
      className="w-full"
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="space-y-4 p-4 rounded-lg border">
          <div className="flex flex-wrap gap-4">
            {/* Search Input */}
            <div className="flex-1 min-w-64">
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, description, or tags..."
                className={`w-full px-3 py-2 rounded-md border text-sm ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Category
              </label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-3 py-2 rounded-md border text-sm ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Min Rating
              </label>
              <select 
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className={`px-3 py-2 rounded-md border text-sm ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value={0}>Any Rating</option>
                <option value={4.5}>4.5+</option>
                <option value={4.7}>4.7+</option>
                <option value={4.8}>4.8+</option>
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={clearFilters}
              size="sm"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        {filteredCards.length === 0 ? (
          <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <div className="text-4xl mb-2">🔍</div>
            <div className="text-lg font-medium mb-1">No results found</div>
            <div className="text-sm">Try adjusting your search or filters</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCards.map(card => (
              <div
                key={card.id}
                className={`p-4 rounded-lg border transition-colors hover:shadow-lg ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {card.title}
                  </h3>
                  <div className="flex items-center text-sm text-yellow-500">
                    ⭐ {card.rating}
                  </div>
                </div>
                
                <div className="mb-2">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    isDark 
                      ? 'bg-blue-900 text-blue-200'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {card.category}
                  </span>
                </div>
                
                <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {card.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {card.tags.map(tag => (
                    <span
                      key={tag}
                      className={`inline-block px-2 py-1 rounded-full text-xs ${
                        isDark 
                          ? 'bg-gray-600 text-gray-300'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};