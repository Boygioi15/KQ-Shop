import * as dotenv from 'dotenv';
import PayOS from "@payos/node";

dotenv.config();

const payOSInstance = new PayOS(
    process.env.PAYOS_CLIENT_ID,
    process.env.PAYOS_API_KEY,
    process.env.PAYOS_CHECKSUM_KEY
);
export default payOSInstance;