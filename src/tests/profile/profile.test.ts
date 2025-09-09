import { beforeAll, describe, expect, it } from "vitest";
import authService from "@/features/auth/services/authService";
import profileService from "@/features/profile/service/profileService";

describe("Profile", () => {
  beforeAll( async () => {
    await authService.signUp({ email: "auth_test2@example.com", password: "password123" })
  })
  
  // TODO: Modificar test de la función para que se obtenga el perfil del usuario de la DB
  // it("should get user profile", async () => {
  //   const response = await authService.login({ email: "auth_test2@example.com", password: "password123" })
  //   expect(response).not.toBeNull()

  //   const user = await profileService.getUserProfile();
  //   expect(user).not.toBeNull()

  //   expect(user?.id).toBe(response.user.id)
  // });

  it("should delete profile", async () => {
    const response = await authService.login({ email: "auth_test2@example.com", password: "password123" })
    const id = response.user.id

    await profileService.deleteProfile(id);
  });
});