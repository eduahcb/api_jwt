/**
 * @openapi
 * components:
 *   schemas:
 *     Login:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 */

/**
 * @openapi
 * components:
 *   securitySchemes:
 *    bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */

/**
 * @openapi
 * tags:
 *   - name: Login
 *     description: Login
 */

/**
 * @openapi
 * /login:
 *  post:
 *   tags:
 *   - Login
 *   summary: User Login
 *   requestBody:
 *    description: Login object that needs to make login
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Login'
 *    required: true
 *   responses:
 *    204:
 *     description: return token in the header
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         message:
 *          type: string
 *          default: Unauthorized
 *         statusCode:
 *          type: number
 *          default: 401
 *    500:
 *     description: Internal Server Error
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         message:
 *          type: string
 *          default: Internal Server Error
 *         statusCode:
 *          type: number
 *          default: 500
 */
