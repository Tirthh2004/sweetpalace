import jwtDecode from "jwt-decode";

export const getUserFromToken = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded; // contains username, user_id, etc.
    } catch (error) {
        return null;
    }
};
