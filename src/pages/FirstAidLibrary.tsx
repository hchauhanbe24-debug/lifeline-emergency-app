import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  Activity, 
  Wind, 
  Droplet, 
  Flame, 
  Bone, 
  Compass, 
  Bug, 
  ChevronRight, 
  ShieldCheck, 
  AlertTriangle,
  Clock,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { FIRST_AID_GUIDES } from '../data/firstAidGuides';
import { FirstAidGuide, EmergencyCategory } from '../types';
import { StepNavigator } from '../components/firstaid/StepNavigator';

interface FirstAidLibraryProps {
  initialGuideId?: string;
  onTriggerSos: () => void;
}

export const FirstAidLibrary: React.FC<FirstAidLibraryProps> = ({
  initialGuideId,
  onTriggerSos
}) => {
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(initialGuideId || null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Guides' },
    { id: 'cpr', label: 'CPR' },
    { id: 'choking', label: 'Choking' },
    { id: 'bleeding', label: 'Bleeding Control' },
    { id: 'burns', label: 'Burns' },
    { id: 'fractures', label: 'Fractures' },
    { id: 'recovery', label: 'Recovery Position' },
    { id: 'bites', label: 'Bites & Stings' }
  ];

  // Filter guides based on query & category
  const filteredGuides = FIRST_AID_GUIDES.filter((guide) => {
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      guide.title.toLowerCase().includes(query) ||
      guide.shortDescription.toLowerCase().includes(query) ||
      guide.tags.some(tag => tag.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  // If a guide is selected, render the interactive step viewer
  const activeGuide = FIRST_AID_GUIDES.find(g => g.id === selectedGuideId);
  if (activeGuide) {
    return (
      <StepNavigator 
        guide={activeGuide}
        onBackToLibrary={() => setSelectedGuideId(null)}
        onTriggerSos={onTriggerSos}
      />
    );
  }

  const getCategoryIcon = (cat: EmergencyCategory) => {
    switch (cat) {
      case 'cpr': return <Activity className="w-5 h-5 text-lifeline-primary" />;
      case 'choking': return <Wind className="w-5 h-5 text-amber-500" />;
      case 'bleeding': return <Droplet className="w-5 h-5 text-rose-600" />;
      case 'burns': return <Flame className="w-5 h-5 text-orange-500" />;
      case 'fractures': return <Bone className="w-5 h-5 text-blue-500" />;
      case 'recovery': return <Compass className="w-5 h-5 text-emerald-500" />;
      case 'bites': return <Bug className="w-5 h-5 text-purple-500" />;
      default: return <BookOpen className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-border shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lifeline-50 text-lifeline-primary text-xs font-bold border border-lifeline-200 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Proposed AIIMS Curriculum Verified</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">
              First-Aid Emergency Library
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Rapid, doctor-reviewed procedures for life-threatening situations. Offline-cached and ready for immediate deployment.
            </p>
          </div>

          <button
            type="button"
            onClick={onTriggerSos}
            className="flex items-center gap-2 px-4 py-2.5 bg-lifeline-primary hover:bg-lifeline-dark text-white rounded-xl text-xs font-extrabold shadow-md shadow-lifeline-primary/30 transition-all self-start sm:self-auto"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Emergency SOS (112)</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-6 relative">
          <search>
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <label htmlFor="first-aid-search" className="sr-only">Search first aid topics</label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                id="first-aid-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search first aid topics (e.g. CPR, choking, burn, bleeding, snake bite)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-lifeline-primary focus:bg-white transition-all shadow-inner"
              />
            </form>
          </search>
        </div>

        {/* Category Filter Chips */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-navy text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Guide Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGuides.length > 0 ? (
          filteredGuides.map((guide) => (
            <article
              key={guide.id}
              onClick={() => setSelectedGuideId(guide.id)}
              className="bg-white rounded-3xl p-5 border border-surface-border hover:border-lifeline-primary hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Card Top Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getCategoryIcon(guide.category)}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        {guide.categoryLabel}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{guide.steps.length} Steps</span>
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    guide.severity === 'critical'
                      ? 'bg-rose-100 text-lifeline-primary'
                      : guide.severity === 'urgent'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {guide.severity}
                  </span>
                </div>

                {/* Title & Short Description */}
                <h2 className="text-base font-extrabold text-navy group-hover:text-lifeline-primary transition-colors">
                  {guide.title}
                </h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                  {guide.shortDescription}
                </p>

                {/* Tags Preview */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {guide.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded-md border border-slate-200">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-lifeline-primary">
                <span>Start Step-by-Step Guide</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-3xl p-10 text-center border border-surface-border">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-navy">No first-aid guides match your search</h3>
            <p className="text-xs text-slate-500 mt-1">Try keywords like CPR, bleeding, burn, choking, or snakebite.</p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Clinical Review Notice */}
      <div className="p-4 bg-slate-100/70 rounded-2xl border border-slate-200 text-[11px] text-slate-500 text-center leading-relaxed">
        <strong>Demo Prototype Notice:</strong> Content aligns with academic first-aid curricula. All life-saving instructions undergo doctor and paramedic verification prior to public rollout. Always confirm instructions with emergency services during live events.
      </div>
    </div>
  );
};
