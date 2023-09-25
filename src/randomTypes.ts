import mongoose, { Schema, Types } from 'mongoose';

export type AuthorId = Types.ObjectId | 'guest';
export const AuthorIdSchema = Schema.Types.Mixed; // Would be better if this was Schema.Types.ObjectId | Schema.Types.String but that doesn't seem possible
