import { act, render, screen, waitFor } from "@testing-library/react";
import { UserProfile } from "./user-profile";
import { Fullname, createNull as createNullFullname } from "./fullname";

test("UserProfile with nullable wrappers", async () => {
  const NullFullname = createNullFullname("dane harnett");

  act(() => {
    render(<UserProfile userId="test-user-id" Fullname={NullFullname} />);
  });

  const li = await screen.findByRole("listitem");
  expect(li.textContent).toEqual("dane harnett");
});

test("UserProfile with mocks", async () => {
  const MockFullname = () => {
    return <em>dane harnett</em>;
  };

  act(() => {
    render(<UserProfile userId="test-user-id" Fullname={MockFullname} />);
  });

  const li = await screen.findByRole("listitem");
  expect(li.textContent).toEqual("dane harnett");
});

test("UserProfile with mocks", async () => {
  const mockFetchUserData = (userId) => {
    return Promise.resolve({
      id: "test-user-id",
      fullname: "dane harnett",
    });
  };

  const MockFullname = (userId) => {
    return <Fullname userId={userId} fetchUserData={mockFetchUserData} />;
  };

  act(() => {
    render(<UserProfile userId="test-user-id" Fullname={MockFullname} />);
  });

  const li = await screen.findByRole("listitem");
  expect(li.textContent).toEqual("dane harnett");
});

test("UserProfile with mocked window.fetch", async () => {
  const originalFetch = window.fetch;
  window.fetch = (url) => {
    console.log(url);
    if (url === "http://localhost:8088?id=test-user-id") {
      return Promise.resolve({
        json: () => {
          return Promise.resolve({
            data: {
              id: "test-user-id",
              fullname: "dane harnett",
            },
          });
        },
      });
    } else {
      throw new Error("Unexpected URL");
    }
  };

  act(() => {
    render(<UserProfile userId="test-user-id" />);
  });

  const li = await screen.findByRole("listitem");
  await waitFor(() => {
    expect(li.textContent).toEqual("dane harnett");
  });

  window.fetch = originalFetch;
});
