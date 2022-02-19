/**
 * @openapi
 *  components:
 *   schemas:
 *    User:
 *     type: object
 *     properties:
 *      name:
 *       type: string
 *      email:
 *       type: string
 *      password:
 *       type: string
 */

/**
 * @openapi
 *  components:
 *   schemas:
 *    UserResponse:
 *     type: object
 *     properties:
 *      id:
 *       type: string
 *      name:
 *       type: string
 *      email:
 *       type: string
 *      createdAt:
 *       type: string
 *      passwordHash:
 *       type: string
 */

/**
 * @openapi
 *  components:
 *   schemas:
 *    InternalServerErrorResponse:
 *     type: object
 *     properties:
 *      message:
 *       type: string
 *       default: Internal Server Error
 *      statusCode:
 *       type: number
 *       default: 500
 */

/**
 * @openapi
 *  components:
 *   schemas:
 *    NotFoundResponse:
 *     type: object
 *     properties:
 *      message:
 *       type: string
 *       default: Not found
 *      statusCode:
 *       type: number
 *       default: 404
 */

/**
 * @openapi
 *  tags:
 *   - name: User
 *     description: User
 */

// POST

/**
 * @openapi
 * /users:
 *  post:
 *   tags:
 *   - User
 *   summary: should create a user
 *   requestBody:
 *    description: User object that needs to create a new user
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/User'
 *    required: true
 *   responses:
 *    201:
 *     description: A new user was created
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/UserResponse'
 *    400:
 *     description: Bad request
 *    500:
 *     description: Internal Server Error
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/InternalServerErrorResponse'
 */

// GET

/**
 * @openapi
 * /users:
 *  get:
 *   tags:
 *   - User
 *   summary: should return a list of users
 *   responses:
 *    200:
 *     description: array of users
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/UserResponse'
 *    500:
 *     description: Internal Server Error
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/InternalServerErrorResponse'
 */

/**
 * @openapi
 * /users/{id}:
 *  get:
 *   tags:
 *   - User
 *   summary: should return user by id
 *   parameters:
 *    - name: id
 *      in: path
 *      description: user id
 *      required: true
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/UserResponse'
 *    404:
 *     description: user not found
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/NotFoundResponse'
 *    500:
 *     description: Internal Server Error
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/InternalServerErrorResponse'
 */

/**
 * @openapi
 * /users/{id}:
 *  delete:
 *   tags:
 *   - User
 *   summary: should delete a user by id
 *   parameters:
 *    - name: id
 *      in: path
 *      description: user id
 *      required: true
 *   responses:
 *    204:
 *     description: user was deleted
 *    404:
 *     description: user not found
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/NotFoundResponse'
 *    500:
 *     description: Internal Server Error
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/InternalServerErrorResponse'
 *   security:
 *    - bearerAuth: []
 */
