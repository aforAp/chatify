import {create} from 'zustand';

export const useAuthStore = create((set) => ({
   //set will update the state.
    authUser: {
        name: "John", _id: 123, age:25
    },
    isLoading: false,
    isLoggedIn: false,
    login: () => {
        console.log("we just logged in");
       set({isLoggedIn: true, isLoading: true});
    }
}));