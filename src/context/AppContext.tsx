import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ActiveView,
  Course,
  Artist,
  Booking,
  UserProfile,
  EventItem,
  ResourceItem,
  Donation,
} from '../types';
import {
  MOCK_COURSES,
  MOCK_ARTISTS,
  MOCK_EVENTS,
  MOCK_RESOURCES,
  INITIAL_USER,
} from '../data/mockData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface AppContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  
  courses: Course[];
  selectedCourse: Course | null;
  setSelectedCourse: (course: Course | null) => void;
  
  artists: Artist[];
  selectedArtist: Artist | null;
  setSelectedArtist: (artist: Artist | null) => void;
  
  events: EventItem[];
  resources: ResourceItem[];
  
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  
  // Modals & Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  
  isAIMentorOpen: boolean;
  setIsAIMentorOpen: (open: boolean) => void;
  isAiMentorOpen: boolean;
  setIsAiMentorOpen: (open: boolean) => void;
  
  isLanguageModalOpen: boolean;
  setIsLanguageModalOpen: (open: boolean) => void;
  
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  bookingArtist: Artist | null;
  setBookingArtist: (artist: Artist | null) => void;
  
  isDonateOpen: boolean;
  setIsDonateOpen: (open: boolean) => void;
  
  isDashboardOpen: boolean;
  setIsDashboardOpen: (open: boolean) => void;
  
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  
  // Actions
  enrollInCourse: (courseId: string) => void;
  completeLesson: (courseId: string, lessonId: string) => void;
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => void;
  addDonation: (amountEUR: number, message?: string) => void;
  
  // Toasts
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [courses] = useState<Course[]>(MOCK_COURSES);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  const [artists] = useState<Artist[]>(MOCK_ARTISTS);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  
  const [events] = useState<EventItem[]>(MOCK_EVENTS);
  const [resources] = useState<ResourceItem[]>(MOCK_RESOURCES);
  
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('aura_user_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_USER;
  });

  useEffect(() => {
    localStorage.setItem('aura_user_profile', JSON.stringify(user));
  }, [user]);

  // Search & Modal states
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAIMentorOpen, setIsAIMentorOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingArtist, setBookingArtist] = useState<Artist | null>(null);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const enrollInCourse = (courseId: string) => {
    if (!user.enrolledCourseIds.includes(courseId)) {
      setUser((prev) => ({
        ...prev,
        enrolledCourseIds: [...prev.enrolledCourseIds, courseId],
        courseProgress: { ...prev.courseProgress, [courseId]: 0 },
      }));
      addToast('Successfully enrolled in course!', 'success');
    }
  };

  const completeLesson = (courseId: string, lessonId: string) => {
    setUser((prev) => {
      const alreadyCompleted = prev.completedLessonIds.includes(lessonId);
      const updatedCompleted = alreadyCompleted
        ? prev.completedLessonIds
        : [...prev.completedLessonIds, lessonId];
      
      const course = courses.find((c) => c.id === courseId);
      let progress = prev.courseProgress[courseId] || 0;
      if (course && course.lessons.length > 0) {
        const completedCount = course.lessons.filter((l) => updatedCompleted.includes(l.id)).length;
        progress = Math.round((completedCount / course.lessons.length) * 100);
      }

      // Check if course 100% completed and generate certificate if needed
      let updatedCerts = prev.certificates;
      if (progress >= 100 && !updatedCerts.some((c) => c.courseId === courseId) && course) {
        updatedCerts = [
          ...updatedCerts,
          {
            courseId,
            courseTitle: course.title,
            issueDate: new Date().toISOString().split('T')[0],
            certificateId: `AURA-CERT-${Date.now().toString().slice(-6)}`,
          },
        ];
        addToast(`🎉 Congratulations! You completed "${course.title}" and earned your Certificate!`, 'success');
      }

      return {
        ...prev,
        completedLessonIds: updatedCompleted,
        courseProgress: { ...prev.courseProgress, [courseId]: progress },
        certificates: updatedCerts,
      };
    });
  };

  const createBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `BK-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
    };
    setUser((prev) => ({
      ...prev,
      bookings: [newBooking, ...prev.bookings],
    }));
    addToast(`Your private session with ${bookingData.artistName} is confirmed!`, 'success');
  };

  const addDonation = (amountEUR: number, message?: string) => {
    const newDonation: Donation = {
      id: `DON-${Date.now().toString().slice(-6)}`,
      amountEUR,
      donorName: user.name,
      donorEmail: user.email,
      message,
      date: new Date().toISOString().split('T')[0],
    };
    setUser((prev) => ({
      ...prev,
      donations: [newDonation, ...prev.donations],
    }));
    addToast(`Thank you for your generous €${amountEUR} donation to music education!`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        courses,
        selectedCourse,
        setSelectedCourse,
        artists,
        selectedArtist,
        setSelectedArtist,
        events,
        resources,
        user,
        setUser,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isAIMentorOpen,
        setIsAIMentorOpen,
        isAiMentorOpen: isAIMentorOpen,
        setIsAiMentorOpen: setIsAIMentorOpen,
        isLanguageModalOpen,
        setIsLanguageModalOpen,
        isBookingOpen,
        setIsBookingOpen,
        bookingArtist,
        setBookingArtist,
        isDonateOpen,
        setIsDonateOpen,
        isDashboardOpen,
        setIsDashboardOpen,
        isAdminOpen,
        setIsAdminOpen,
        enrollInCourse,
        completeLesson,
        createBooking,
        addDonation,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
