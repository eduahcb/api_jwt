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
 *   - name: Logout
 *     description: Logout
 */

/**
 * @openapi
 * /logout:
 *  get:
 *   tags:
 *   - Logout
 *   summary: User Logout
 *   responses:
 *    204:
 *     description: user was logged out
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
 *   security:
 *    - bearerAuth: []
 */
