import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ users, pass, force }) {
      const config = useRuntimeConfig();
      this.loading = true;

      try {
        const data = await $fetch(config.public.apiBase + "/api/login", {
          method: "post",
          body: { users, pass, force },
        });

        if (data) {
          const token = useCookie("token"); // useCookie new hook in nuxt 3
          const _id = useCookie("_id"); // useCookie new hook in nuxt 3
          const role = useCookie("role"); // useCookie new hook in nuxt 3

          this.authenticated = true; // set authenticated  state value to true
          token.value = data.sessionId; // set token to cookie
          _id.value = data.data.UUID; // set _id to cookie
          role.value = data.data.Role; // set role to cookie
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
      const config = useRuntimeConfig();

      const { data, pending, error } = await $fetch(
        config.public.apiBase + "/api/logout",
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
      this.userData = null; // Clear user data

    },

    async sessionWatcher() {
      const token = useCookie("token"); // useCookie new hook in nuxt 3
      const config = useRuntimeConfig();
      const email = this.userData;
      console.log(email);

      if (token.value) {
        try {
          const uuid = useCookie("_id");
          const data = await $fetch(
            config.public.apiBase + "/api/session/check",
            {
              method: "POST",
              body: {
                users: uuid.value,
                sessionid: token.value,
              },
            }
          );
          console.log(data);
        } catch (error) {
          console.error("Session error:", error);
          console.error("Session error:", error.data);
          if (error.data.result === false) {
            const token = useCookie("token"); // useCookie new hook in nuxt 3
            this.authenticated = false; // set authenticated  state value to false
            token.value = null; // clear the token cookie
            console.log("session does not exist");
          } else {
            console.log("session exists");
          }
        }
      }
    },

    async registerUser({
      name,
      username,
      email,
      phone,
      password,
      verifyPassword,
      role,
    }) {
      const config = useRuntimeConfig();
      const router = useRouter();

      const phoneString = phone.toString();
      this.loading = true;
      try {
        const data = await $fetch(config.public.apiBase + "/api/register", {
          method: "post",
          body: {
            name,
            username,
            email,
            phone: "62" + phoneString,
            password,
            verifypassword: verifyPassword,
            role,
          },
        });

        if (data.code === 200) {
          router.push("/login");
        }

        // Successful login logic...
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.error("Register error:", error.data);
        const errorData = error.data;
        throw errorData;
      }
    },

    async validationUser(users) {
      const config = useRuntimeConfig();
      this.loading = true;

      try {
        const data = await $fetch(
          config.public.apiBase + "/api/validation/getotp",
          {
            method: "post",
            body: {
              users: users,
            },
          }
        );

        if (data.code === 200) {
          console.log("validation success");
          document.getElementById("otp").showModal();
        }

        // Successful login logic...
        this.loading = false;

        console.log(data);
        return data;
      } catch (error) {
        this.loading = false;
        console.error("Validation error:", error);
        const errorData = error;
        return errorData;
      }
    },

    async sendOtpUsers(code, users) {
      const config = useRuntimeConfig();
      this.loading = true;

      try {
        const data = await $fetch(
          config.public.apiBase + "/api/validation/giveotp",
          {
            method: "post",
            body: {
              code,
              users,
            },
          }
        );

        if (data.code === 200) {
          console.log("otp success");
          document.getElementById("otp").close();
        }

        // Successful login logic...
        this.loading = false;

        console.log(data);
        return data;
      } catch (error) {
        this.loading = false;
        console.error("Otp error:", error);
        const errorData = error;
        throw errorData;
      }
    },
  },
});
