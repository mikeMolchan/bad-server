import { Joi, Segments, celebrate } from 'celebrate'
import { StatusType } from '../models/order'

const pagination = {
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1),
}
const sortOrder = Joi.string().valid('asc', 'desc')
const optionalNumber = Joi.number().empty('')
const optionalDate = Joi.string().isoDate().empty('')
const search = Joi.string().max(50).allow('')

export const validateOrdersQuery = celebrate({
    [Segments.QUERY]: Joi.object({
        ...pagination,
        sortField: Joi.string().valid(
            'createdAt',
            'totalAmount',
            'orderNumber',
            'status'
        ),
        sortOrder,
        status: Joi.string()
            .valid(...Object.values(StatusType))
            .empty(''),
        totalAmountFrom: optionalNumber,
        totalAmountTo: optionalNumber,
        orderDateFrom: optionalDate,
        orderDateTo: optionalDate,
        search,
    }).unknown(true),
})

export const validateCustomersQuery = celebrate({
    [Segments.QUERY]: Joi.object({
        ...pagination,
        sortField: Joi.string().valid(
            'createdAt',
            'lastOrderDate',
            'totalAmount',
            'orderCount',
            'name'
        ),
        sortOrder,
        registrationDateFrom: optionalDate,
        registrationDateTo: optionalDate,
        lastOrderDateFrom: optionalDate,
        lastOrderDateTo: optionalDate,
        totalAmountFrom: optionalNumber,
        totalAmountTo: optionalNumber,
        orderCountFrom: optionalNumber,
        orderCountTo: optionalNumber,
        search,
    }).unknown(true),
})

export const validateCustomerId = celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.string().hex().length(24).required(),
    }),
})

export const validateUserUpdateBody = celebrate({
    [Segments.BODY]: Joi.object({
        name: Joi.string().min(2).max(30),
        phone: Joi.string().max(20),
        email: Joi.string().email(),
    }),
})
