
import { useState, useMemo } from 'react';
import { User, SearchFilters } from '../types';

export const useSearch = (tutors: User[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});

  const filteredTutors = useMemo(() => {
    let result = tutors;

    // Text search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(tutor => 
        tutor.name.toLowerCase().includes(query) ||
        tutor.subjects?.some(subject => subject.toLowerCase().includes(query)) ||
        tutor.bio?.toLowerCase().includes(query)
      );
    }

    // Subject filter
    if (filters.subject) {
      result = result.filter(tutor => 
        tutor.subjects?.includes(filters.subject!)
      );
    }

    // Price range filter
    if (filters.minPrice !== undefined) {
      result = result.filter(tutor => 
        tutor.hourlyRate! >= filters.minPrice!
      );
    }

    if (filters.maxPrice !== undefined) {
      result = result.filter(tutor => 
        tutor.hourlyRate! <= filters.maxPrice!
      );
    }

    // Rating filter
    if (filters.rating !== undefined) {
      result = result.filter(tutor => 
        tutor.rating! >= filters.rating!
      );
    }

    // Sort by rating (highest first)
    result.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    return result;
  }, [tutors, searchQuery, filters]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredTutors,
  };
};
