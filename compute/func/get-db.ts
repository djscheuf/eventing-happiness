import { db } from "../db";
import { Database } from "../models/db";

export function getDB():Database {
    return db;
}