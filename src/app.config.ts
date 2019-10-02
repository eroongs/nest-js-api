import { ValidationPipe } from "@nestjs/common";

export const JWT_SECRET = 'THIS-IS-A-SECRET-KEY';

export const VALIDATION_PIPE = new ValidationPipe({
    transform: true,
    whitelist: true,
    validationError: {
        target: false
    }
});