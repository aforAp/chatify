import {create} from 'zustand';
import {axiosInstance} from "../lib/axios.js";
import {toast} from 'react-hot-toast';
export const useAuthStore = create((set) => ({
   //set will update the state.
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  checkAuth: async () => {
    try {
    const res = await axiosInstance.get("/auth/check")
    set({
        authUser: res.data
    })

    } catch(error){
       console.log("error in authCheck:", error);
       set({authUser: null})
    } finally {
        set({isCheckingAuth: false});
    }
  },

  signup: async (data) => {
  set({ isSigningUp: true });
  try {
    const res = await axiosInstance.post("/auth/signup", data);
    set({ authUser: res.data });

    // show success toast only if signup succeeds
    toast.success("Account created successfully");
  } catch (error) {
    console.error("Signup error:", error);

    // safe fallback for error message
    const msg =
      error?.response?.data?.message || "Something went wrong. Try again!";
    toast.error(msg);
  } finally {
    set({ isSigningUp: false });
  }
},

  login: async (data) => {
    set({
      isSigningUp: true
    });
try {
  const res = await axiosInstance.post("/auth/login", data);
  set({
    authUser: res.data
  });
  toast.success("LoggedIn Successfully");
} catch(error) {
  toast.error(error.response.data.message);
} finally {
  set({
    isLoggingIn: false
  });
}
  },

  logout: async () => {
    try {
    await axiosInstance.post("/auth/logout");
 set({
  authUser: null
 });
 toast.success("Logged out successfully");
    } catch(error) {
       toast.error("Error logging out successfully");
       console.log(error);
    }
  }
}));