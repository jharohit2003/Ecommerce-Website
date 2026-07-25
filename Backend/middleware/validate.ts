import type { ZodType } from "zod";

// Validates req.body against a Zod schema; rejects with 400 + first error message.
const validate = (schema: ZodType) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ success: false, message: result.error.issues[0].message });
  }
  req.body = result.data;
  next();
};

export default validate;
