import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const emailSchema = schema.string({ trim: true }, [
  rules.email(),
  rules.unique({
    table: 'users',
    column: 'email',
  }),
])
export const passwordSchema = schema.string({ trim: true }, [rules.minLength(8)])
export const fromSchema = schema.date.optional({
  format: 'iso',
})
export const toSchema = schema.date.optional({
  format: 'iso',
})
export const cateSchema = schema.string.optional({ escape: true, trim: true }, [
  rules.maxLength(20),
])
export const bySchema = schema.string({ escape: true, trim: true }, [rules.by()])
export const pgSchema = schema.number()
export const dateSchema = schema.date({
  format: 'iso',
})
export const amountSchema = schema.number()
export const descriptionSchema = schema.string({ escape: true, trim: true }, [rules.maxLength(256)])
export const categorySchema = schema.string({ escape: true, trim: true }, [rules.maxLength(32)])
export const nameSchema = schema.string({ escape: true, trim: true }, [rules.maxLength(32)])

export const parseOrderBy = (str) => {
  if (str[0] === '-') {
    return [str.substring(1), 'DESC']
  }
  return [str, 'ASC']
}
