// store/useStore.js
import { create } from 'zustand';

const useStore = create((set) => ({
  // Verification state
  verification: {
    selectedType: 'Pan Card',
    cardNumber: '',
  },
  
  // Partner preferences state
  preferences: {
    age: '21-50 years of age',
    height: '5\'2 - 5\'6',
    state: 'Delhi',
    city: 'Delhi',
    maritalStatus: '',
    education: '',
    occupation: '',
    income: '',
    religion: '',
    caste: '',
    community: '',
    subCommunity: '',
    motherTongue: '',
  },

  // Actions
  setVerificationType: (type) =>
    set((state) => ({
      verification: { ...state.verification, selectedType: type },
    })),

  setCardNumber: (number) =>
    set((state) => ({
      verification: { ...state.verification, cardNumber: number },
    })),

  updatePreference: (key, value) =>
    set((state) => ({
      preferences: { ...state.preferences, [key]: value },
    })),

  resetStore: () =>
    set({
      verification: {
        selectedType: 'Pan Card',
        cardNumber: '',
      },
      preferences: {
        age: '21-50 years of age',
        height: '5\'2 - 5\'6',
        state: 'Delhi',
        city: 'Delhi',
        maritalStatus: '',
        education: '',
        occupation: '',
        income: '',
        religion: '',
        caste: '',
        community: '',
        subCommunity: '',
        motherTongue: '',
      },
    }),
}));

export default useStore;