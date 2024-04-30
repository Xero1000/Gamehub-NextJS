import NextAuth from "next-auth";
import authOptions from "../authOptions"; // Import the options object for NextAuth configuration

// Initialize NextAuth with the specified configuration options
const handler = NextAuth(authOptions);

// Export the handler for handling GET and POST requests related to authentication
export { handler as GET, handler as POST };


