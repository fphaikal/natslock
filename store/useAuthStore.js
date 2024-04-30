import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ users, pass, force }) {
      const config = useRuntimeConfig()
      this.loading = true;

      try {
        const data = await $fetch(config.public.apiBase +"/api/login", {
          method: "post",
          body: { users, pass, force },
        });

        if (data) {
          const token = useCookie("token"); // useCookie new hook in nuxt 3
          token.value = data.sessionId; // set token to cookie
          this.authenticated = true; // set authenticated  state value to true
          localStorage.setItem("email", JSON.stringify(data.data.Email)); // store user data in local storage
        }

        // Successful login logic...
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.error("Authentication error:", error.data);
        const errorData = error.data;
        throw errorData;
      }
    },
    async logUserOut() {
      const config = useRuntimeConfig()

      const { data, pending, error } = await $fetch(config.public.apiBase +"/api/logout",
        {
          method: "post",
          body: {
            sessionId: useCookie("token").value,
          },
        }
      );
      this.loading = pending;

      const token = useCookie("token"); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
      localStorage.removeItem("email"); // remove user data from local storage
    },

    async sessionWatcher() {
      const token = useCookie("token"); // useCookie new hook in nuxt 3
      const config = useRuntimeConfig()


      if (token.value) {
        try {
          const data = await $fetch(config.public.apiBase + "/api/session/check", {
            method: "POST",
            body: {
              users: localStorage.getItem("email")?.replace(/"/g, ""),
              sessionid: token.value,
            },
          });
          console.log(data);
        } catch (error) {
          console.error("Session error:", error.data);
          if (error.data.result === false) {
            const token = useCookie("token"); // useCookie new hook in nuxt 3
            this.authenticated = false; // set authenticated  state value to false
            token.value = null; // clear the token cookie
            localStorage.removeItem("email"); // remove user data from local storage
            console.log("session does not exist");
          } else {
            console.log("session exists");
          }
        }
      }
    },
  },
});
