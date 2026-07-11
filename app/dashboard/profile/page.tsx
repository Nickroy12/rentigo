
import { getUserSession } from "@/lib/core/session";
import { Mail, User, Calendar } from "lucide-react";
import Image from "next/image";

// Defined the exact interface matching your current user data structure
interface UserSession {
  name?: string | null;
  email?: string | null;
  createdAt?: string | Date;
  emailVerified?: boolean;
}

const ProfilePage = async (): Promise<JSX.Element> => {
  const user: UserSession | null = await getUserSession();
  
  // Dynamic placeholder avatar based on the user's name
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.name || "User"
  )}&background=0066cc&color=fff`;

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-background rounded-2xl shadow-lg shadow-blue-50/20 overflow-hidden">
          
          {/* Cover - Blue UI */}
          <div className="h-40 bg-gradient-to-r from-blue-500 to-blue-600"></div>

          {/* Profile Header */}
          <div className="relative px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16">
           <div className="w-50 h-50 rounded-full flex items-center justify-center text-4xl font-bold shrink-0 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/30">
            {user?.name?.charAt(0) || "U"}
          </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold">
                  {user?.name || "Unknown User"}
                </h1>

                <p className="text-gray-500 mt-1">
                  {user?.email || "No email available"}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid md:grid-cols-2 gap-6 p-8 border-t">
            
            {/* Personal Info */}
            <div className="bg-background rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-5">
                Personal Information
              </h2>

              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <User size={20} />
                  <div>
                    <p className="text-sm text-foreground">Full Name</p>
                    <p className="font-medium">{user?.name || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={20} />
                  <div>
                    <p className="text-sm text-foreground">Email</p>
                    <p className="font-medium">{user?.email || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar size={20} />
                  <div>
                    <p className="text-sm text-foreground">Member Since</p>
                    <p className="font-medium">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-background rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-5">
                Account Overview
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="text-blue-600 font-medium">
                    Active
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Email Verified</span>
                  <span
                    className={`font-medium ${
                      user?.emailVerified
                        ? "text-blue-600"
                        : "text-red-600"
                    }`}
                  >
                    {user?.emailVerified ? "Verified" : "Not Verified"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 p-8 border-t">
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;