import { afterAll, describe, expect, it } from "vitest";
import authService from "@/features/auth/services/authService.ts";
import profileService from "@/features/profile/service/profileService";

// TODO: Agregar casos donde se debería dar error
describe("Auth", () => {
  afterAll( async () => {
    const response = await authService.login({ email: "auth_test1@example.com", password: "password123" })
    const id = response.user.id
    
    await profileService.deleteProfile(id);
  });

  it("should login", async () => {
    const response = await authService.login({ email: "test@example.com", password: "password123" })
    expect(response).not.toBeNull()
    expect(response.user).toBeDefined()
  });
  
  it("should logout", async () => {
    const response = await authService.logout();
    expect(response).not.toBeNull()
  });

  it("should sign up", async () => {
    const response = await authService.signUp({ email: "auth_test1@example.com", password: "password123", display_name: "Test Auth User 1" });
    expect(response).not.toBeNull()
    expect(response.user).toBeDefined()
  });

});