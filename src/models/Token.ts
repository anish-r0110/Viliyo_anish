export default interface Token {
    accessToken: string;
    refreshToken:string
    tokenType: string;
    expiresIn: number;
}