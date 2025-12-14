
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model WorkPlan
 * 
 */
export type WorkPlan = $Result.DefaultSelection<Prisma.$WorkPlanPayload>
/**
 * Model WorkplaceInspection
 * 
 */
export type WorkplaceInspection = $Result.DefaultSelection<Prisma.$WorkplaceInspectionPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model Personnel
 * 
 */
export type Personnel = $Result.DefaultSelection<Prisma.$PersonnelPayload>
/**
 * Model WorkEquipment
 * 
 */
export type WorkEquipment = $Result.DefaultSelection<Prisma.$WorkEquipmentPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workPlan`: Exposes CRUD operations for the **WorkPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkPlans
    * const workPlans = await prisma.workPlan.findMany()
    * ```
    */
  get workPlan(): Prisma.WorkPlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workplaceInspection`: Exposes CRUD operations for the **WorkplaceInspection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkplaceInspections
    * const workplaceInspections = await prisma.workplaceInspection.findMany()
    * ```
    */
  get workplaceInspection(): Prisma.WorkplaceInspectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.personnel`: Exposes CRUD operations for the **Personnel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Personnel
    * const personnel = await prisma.personnel.findMany()
    * ```
    */
  get personnel(): Prisma.PersonnelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workEquipment`: Exposes CRUD operations for the **WorkEquipment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkEquipments
    * const workEquipments = await prisma.workEquipment.findMany()
    * ```
    */
  get workEquipment(): Prisma.WorkEquipmentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.1
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    WorkPlan: 'WorkPlan',
    WorkplaceInspection: 'WorkplaceInspection',
    Notification: 'Notification',
    Personnel: 'Personnel',
    WorkEquipment: 'WorkEquipment'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "workPlan" | "workplaceInspection" | "notification" | "personnel" | "workEquipment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      WorkPlan: {
        payload: Prisma.$WorkPlanPayload<ExtArgs>
        fields: Prisma.WorkPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPlanPayload>
          }
          findFirst: {
            args: Prisma.WorkPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPlanPayload>
          }
          findMany: {
            args: Prisma.WorkPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPlanPayload>[]
          }
          create: {
            args: Prisma.WorkPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPlanPayload>
          }
          createMany: {
            args: Prisma.WorkPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPlanPayload>[]
          }
          delete: {
            args: Prisma.WorkPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPlanPayload>
          }
          update: {
            args: Prisma.WorkPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPlanPayload>
          }
          deleteMany: {
            args: Prisma.WorkPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkPlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPlanPayload>[]
          }
          upsert: {
            args: Prisma.WorkPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkPlanPayload>
          }
          aggregate: {
            args: Prisma.WorkPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkPlan>
          }
          groupBy: {
            args: Prisma.WorkPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkPlanCountArgs<ExtArgs>
            result: $Utils.Optional<WorkPlanCountAggregateOutputType> | number
          }
        }
      }
      WorkplaceInspection: {
        payload: Prisma.$WorkplaceInspectionPayload<ExtArgs>
        fields: Prisma.WorkplaceInspectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkplaceInspectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkplaceInspectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkplaceInspectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkplaceInspectionPayload>
          }
          findFirst: {
            args: Prisma.WorkplaceInspectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkplaceInspectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkplaceInspectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkplaceInspectionPayload>
          }
          findMany: {
            args: Prisma.WorkplaceInspectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkplaceInspectionPayload>[]
          }
          create: {
            args: Prisma.WorkplaceInspectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkplaceInspectionPayload>
          }
          createMany: {
            args: Prisma.WorkplaceInspectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkplaceInspectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkplaceInspectionPayload>[]
          }
          delete: {
            args: Prisma.WorkplaceInspectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkplaceInspectionPayload>
          }
          update: {
            args: Prisma.WorkplaceInspectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkplaceInspectionPayload>
          }
          deleteMany: {
            args: Prisma.WorkplaceInspectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkplaceInspectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkplaceInspectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkplaceInspectionPayload>[]
          }
          upsert: {
            args: Prisma.WorkplaceInspectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkplaceInspectionPayload>
          }
          aggregate: {
            args: Prisma.WorkplaceInspectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkplaceInspection>
          }
          groupBy: {
            args: Prisma.WorkplaceInspectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkplaceInspectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkplaceInspectionCountArgs<ExtArgs>
            result: $Utils.Optional<WorkplaceInspectionCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      Personnel: {
        payload: Prisma.$PersonnelPayload<ExtArgs>
        fields: Prisma.PersonnelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PersonnelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonnelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PersonnelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonnelPayload>
          }
          findFirst: {
            args: Prisma.PersonnelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonnelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PersonnelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonnelPayload>
          }
          findMany: {
            args: Prisma.PersonnelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonnelPayload>[]
          }
          create: {
            args: Prisma.PersonnelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonnelPayload>
          }
          createMany: {
            args: Prisma.PersonnelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PersonnelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonnelPayload>[]
          }
          delete: {
            args: Prisma.PersonnelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonnelPayload>
          }
          update: {
            args: Prisma.PersonnelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonnelPayload>
          }
          deleteMany: {
            args: Prisma.PersonnelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PersonnelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PersonnelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonnelPayload>[]
          }
          upsert: {
            args: Prisma.PersonnelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonnelPayload>
          }
          aggregate: {
            args: Prisma.PersonnelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePersonnel>
          }
          groupBy: {
            args: Prisma.PersonnelGroupByArgs<ExtArgs>
            result: $Utils.Optional<PersonnelGroupByOutputType>[]
          }
          count: {
            args: Prisma.PersonnelCountArgs<ExtArgs>
            result: $Utils.Optional<PersonnelCountAggregateOutputType> | number
          }
        }
      }
      WorkEquipment: {
        payload: Prisma.$WorkEquipmentPayload<ExtArgs>
        fields: Prisma.WorkEquipmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkEquipmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkEquipmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkEquipmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkEquipmentPayload>
          }
          findFirst: {
            args: Prisma.WorkEquipmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkEquipmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkEquipmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkEquipmentPayload>
          }
          findMany: {
            args: Prisma.WorkEquipmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkEquipmentPayload>[]
          }
          create: {
            args: Prisma.WorkEquipmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkEquipmentPayload>
          }
          createMany: {
            args: Prisma.WorkEquipmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkEquipmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkEquipmentPayload>[]
          }
          delete: {
            args: Prisma.WorkEquipmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkEquipmentPayload>
          }
          update: {
            args: Prisma.WorkEquipmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkEquipmentPayload>
          }
          deleteMany: {
            args: Prisma.WorkEquipmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkEquipmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkEquipmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkEquipmentPayload>[]
          }
          upsert: {
            args: Prisma.WorkEquipmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkEquipmentPayload>
          }
          aggregate: {
            args: Prisma.WorkEquipmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkEquipment>
          }
          groupBy: {
            args: Prisma.WorkEquipmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkEquipmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkEquipmentCountArgs<ExtArgs>
            result: $Utils.Optional<WorkEquipmentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    workPlan?: WorkPlanOmit
    workplaceInspection?: WorkplaceInspectionOmit
    notification?: NotificationOmit
    personnel?: PersonnelOmit
    workEquipment?: WorkEquipmentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model WorkPlan
   */

  export type AggregateWorkPlan = {
    _count: WorkPlanCountAggregateOutputType | null
    _min: WorkPlanMinAggregateOutputType | null
    _max: WorkPlanMaxAggregateOutputType | null
  }

  export type WorkPlanMinAggregateOutputType = {
    id: string | null
    start: Date | null
    end: Date | null
    title: string | null
    number: string | null
    location: string | null
    address: string | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkPlanMaxAggregateOutputType = {
    id: string | null
    start: Date | null
    end: Date | null
    title: string | null
    number: string | null
    location: string | null
    address: string | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkPlanCountAggregateOutputType = {
    id: number
    start: number
    end: number
    title: number
    number: number
    location: number
    address: number
    type: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WorkPlanMinAggregateInputType = {
    id?: true
    start?: true
    end?: true
    title?: true
    number?: true
    location?: true
    address?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkPlanMaxAggregateInputType = {
    id?: true
    start?: true
    end?: true
    title?: true
    number?: true
    location?: true
    address?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkPlanCountAggregateInputType = {
    id?: true
    start?: true
    end?: true
    title?: true
    number?: true
    location?: true
    address?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkPlan to aggregate.
     */
    where?: WorkPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkPlans to fetch.
     */
    orderBy?: WorkPlanOrderByWithRelationInput | WorkPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkPlans
    **/
    _count?: true | WorkPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkPlanMaxAggregateInputType
  }

  export type GetWorkPlanAggregateType<T extends WorkPlanAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkPlan[P]>
      : GetScalarType<T[P], AggregateWorkPlan[P]>
  }




  export type WorkPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkPlanWhereInput
    orderBy?: WorkPlanOrderByWithAggregationInput | WorkPlanOrderByWithAggregationInput[]
    by: WorkPlanScalarFieldEnum[] | WorkPlanScalarFieldEnum
    having?: WorkPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkPlanCountAggregateInputType | true
    _min?: WorkPlanMinAggregateInputType
    _max?: WorkPlanMaxAggregateInputType
  }

  export type WorkPlanGroupByOutputType = {
    id: string
    start: Date
    end: Date
    title: string
    number: string
    location: string
    address: string
    type: string
    createdAt: Date
    updatedAt: Date
    _count: WorkPlanCountAggregateOutputType | null
    _min: WorkPlanMinAggregateOutputType | null
    _max: WorkPlanMaxAggregateOutputType | null
  }

  type GetWorkPlanGroupByPayload<T extends WorkPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkPlanGroupByOutputType[P]>
            : GetScalarType<T[P], WorkPlanGroupByOutputType[P]>
        }
      >
    >


  export type WorkPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    start?: boolean
    end?: boolean
    title?: boolean
    number?: boolean
    location?: boolean
    address?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["workPlan"]>

  export type WorkPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    start?: boolean
    end?: boolean
    title?: boolean
    number?: boolean
    location?: boolean
    address?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["workPlan"]>

  export type WorkPlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    start?: boolean
    end?: boolean
    title?: boolean
    number?: boolean
    location?: boolean
    address?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["workPlan"]>

  export type WorkPlanSelectScalar = {
    id?: boolean
    start?: boolean
    end?: boolean
    title?: boolean
    number?: boolean
    location?: boolean
    address?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WorkPlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "start" | "end" | "title" | "number" | "location" | "address" | "type" | "createdAt" | "updatedAt", ExtArgs["result"]["workPlan"]>

  export type $WorkPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkPlan"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      start: Date
      end: Date
      title: string
      number: string
      location: string
      address: string
      type: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["workPlan"]>
    composites: {}
  }

  type WorkPlanGetPayload<S extends boolean | null | undefined | WorkPlanDefaultArgs> = $Result.GetResult<Prisma.$WorkPlanPayload, S>

  type WorkPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkPlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkPlanCountAggregateInputType | true
    }

  export interface WorkPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkPlan'], meta: { name: 'WorkPlan' } }
    /**
     * Find zero or one WorkPlan that matches the filter.
     * @param {WorkPlanFindUniqueArgs} args - Arguments to find a WorkPlan
     * @example
     * // Get one WorkPlan
     * const workPlan = await prisma.workPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkPlanFindUniqueArgs>(args: SelectSubset<T, WorkPlanFindUniqueArgs<ExtArgs>>): Prisma__WorkPlanClient<$Result.GetResult<Prisma.$WorkPlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkPlan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkPlanFindUniqueOrThrowArgs} args - Arguments to find a WorkPlan
     * @example
     * // Get one WorkPlan
     * const workPlan = await prisma.workPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkPlanClient<$Result.GetResult<Prisma.$WorkPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkPlanFindFirstArgs} args - Arguments to find a WorkPlan
     * @example
     * // Get one WorkPlan
     * const workPlan = await prisma.workPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkPlanFindFirstArgs>(args?: SelectSubset<T, WorkPlanFindFirstArgs<ExtArgs>>): Prisma__WorkPlanClient<$Result.GetResult<Prisma.$WorkPlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkPlanFindFirstOrThrowArgs} args - Arguments to find a WorkPlan
     * @example
     * // Get one WorkPlan
     * const workPlan = await prisma.workPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkPlanClient<$Result.GetResult<Prisma.$WorkPlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkPlans
     * const workPlans = await prisma.workPlan.findMany()
     * 
     * // Get first 10 WorkPlans
     * const workPlans = await prisma.workPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workPlanWithIdOnly = await prisma.workPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkPlanFindManyArgs>(args?: SelectSubset<T, WorkPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkPlan.
     * @param {WorkPlanCreateArgs} args - Arguments to create a WorkPlan.
     * @example
     * // Create one WorkPlan
     * const WorkPlan = await prisma.workPlan.create({
     *   data: {
     *     // ... data to create a WorkPlan
     *   }
     * })
     * 
     */
    create<T extends WorkPlanCreateArgs>(args: SelectSubset<T, WorkPlanCreateArgs<ExtArgs>>): Prisma__WorkPlanClient<$Result.GetResult<Prisma.$WorkPlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkPlans.
     * @param {WorkPlanCreateManyArgs} args - Arguments to create many WorkPlans.
     * @example
     * // Create many WorkPlans
     * const workPlan = await prisma.workPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkPlanCreateManyArgs>(args?: SelectSubset<T, WorkPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkPlans and returns the data saved in the database.
     * @param {WorkPlanCreateManyAndReturnArgs} args - Arguments to create many WorkPlans.
     * @example
     * // Create many WorkPlans
     * const workPlan = await prisma.workPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkPlans and only return the `id`
     * const workPlanWithIdOnly = await prisma.workPlan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkPlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkPlan.
     * @param {WorkPlanDeleteArgs} args - Arguments to delete one WorkPlan.
     * @example
     * // Delete one WorkPlan
     * const WorkPlan = await prisma.workPlan.delete({
     *   where: {
     *     // ... filter to delete one WorkPlan
     *   }
     * })
     * 
     */
    delete<T extends WorkPlanDeleteArgs>(args: SelectSubset<T, WorkPlanDeleteArgs<ExtArgs>>): Prisma__WorkPlanClient<$Result.GetResult<Prisma.$WorkPlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkPlan.
     * @param {WorkPlanUpdateArgs} args - Arguments to update one WorkPlan.
     * @example
     * // Update one WorkPlan
     * const workPlan = await prisma.workPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkPlanUpdateArgs>(args: SelectSubset<T, WorkPlanUpdateArgs<ExtArgs>>): Prisma__WorkPlanClient<$Result.GetResult<Prisma.$WorkPlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkPlans.
     * @param {WorkPlanDeleteManyArgs} args - Arguments to filter WorkPlans to delete.
     * @example
     * // Delete a few WorkPlans
     * const { count } = await prisma.workPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkPlanDeleteManyArgs>(args?: SelectSubset<T, WorkPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkPlans
     * const workPlan = await prisma.workPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkPlanUpdateManyArgs>(args: SelectSubset<T, WorkPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkPlans and returns the data updated in the database.
     * @param {WorkPlanUpdateManyAndReturnArgs} args - Arguments to update many WorkPlans.
     * @example
     * // Update many WorkPlans
     * const workPlan = await prisma.workPlan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkPlans and only return the `id`
     * const workPlanWithIdOnly = await prisma.workPlan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkPlanUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkPlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkPlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkPlan.
     * @param {WorkPlanUpsertArgs} args - Arguments to update or create a WorkPlan.
     * @example
     * // Update or create a WorkPlan
     * const workPlan = await prisma.workPlan.upsert({
     *   create: {
     *     // ... data to create a WorkPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkPlan we want to update
     *   }
     * })
     */
    upsert<T extends WorkPlanUpsertArgs>(args: SelectSubset<T, WorkPlanUpsertArgs<ExtArgs>>): Prisma__WorkPlanClient<$Result.GetResult<Prisma.$WorkPlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkPlanCountArgs} args - Arguments to filter WorkPlans to count.
     * @example
     * // Count the number of WorkPlans
     * const count = await prisma.workPlan.count({
     *   where: {
     *     // ... the filter for the WorkPlans we want to count
     *   }
     * })
    **/
    count<T extends WorkPlanCountArgs>(
      args?: Subset<T, WorkPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkPlanAggregateArgs>(args: Subset<T, WorkPlanAggregateArgs>): Prisma.PrismaPromise<GetWorkPlanAggregateType<T>>

    /**
     * Group by WorkPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkPlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkPlanGroupByArgs['orderBy'] }
        : { orderBy?: WorkPlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkPlan model
   */
  readonly fields: WorkPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkPlan model
   */
  interface WorkPlanFieldRefs {
    readonly id: FieldRef<"WorkPlan", 'String'>
    readonly start: FieldRef<"WorkPlan", 'DateTime'>
    readonly end: FieldRef<"WorkPlan", 'DateTime'>
    readonly title: FieldRef<"WorkPlan", 'String'>
    readonly number: FieldRef<"WorkPlan", 'String'>
    readonly location: FieldRef<"WorkPlan", 'String'>
    readonly address: FieldRef<"WorkPlan", 'String'>
    readonly type: FieldRef<"WorkPlan", 'String'>
    readonly createdAt: FieldRef<"WorkPlan", 'DateTime'>
    readonly updatedAt: FieldRef<"WorkPlan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkPlan findUnique
   */
  export type WorkPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPlan
     */
    select?: WorkPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPlan
     */
    omit?: WorkPlanOmit<ExtArgs> | null
    /**
     * Filter, which WorkPlan to fetch.
     */
    where: WorkPlanWhereUniqueInput
  }

  /**
   * WorkPlan findUniqueOrThrow
   */
  export type WorkPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPlan
     */
    select?: WorkPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPlan
     */
    omit?: WorkPlanOmit<ExtArgs> | null
    /**
     * Filter, which WorkPlan to fetch.
     */
    where: WorkPlanWhereUniqueInput
  }

  /**
   * WorkPlan findFirst
   */
  export type WorkPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPlan
     */
    select?: WorkPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPlan
     */
    omit?: WorkPlanOmit<ExtArgs> | null
    /**
     * Filter, which WorkPlan to fetch.
     */
    where?: WorkPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkPlans to fetch.
     */
    orderBy?: WorkPlanOrderByWithRelationInput | WorkPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkPlans.
     */
    cursor?: WorkPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkPlans.
     */
    distinct?: WorkPlanScalarFieldEnum | WorkPlanScalarFieldEnum[]
  }

  /**
   * WorkPlan findFirstOrThrow
   */
  export type WorkPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPlan
     */
    select?: WorkPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPlan
     */
    omit?: WorkPlanOmit<ExtArgs> | null
    /**
     * Filter, which WorkPlan to fetch.
     */
    where?: WorkPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkPlans to fetch.
     */
    orderBy?: WorkPlanOrderByWithRelationInput | WorkPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkPlans.
     */
    cursor?: WorkPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkPlans.
     */
    distinct?: WorkPlanScalarFieldEnum | WorkPlanScalarFieldEnum[]
  }

  /**
   * WorkPlan findMany
   */
  export type WorkPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPlan
     */
    select?: WorkPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPlan
     */
    omit?: WorkPlanOmit<ExtArgs> | null
    /**
     * Filter, which WorkPlans to fetch.
     */
    where?: WorkPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkPlans to fetch.
     */
    orderBy?: WorkPlanOrderByWithRelationInput | WorkPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkPlans.
     */
    cursor?: WorkPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkPlans.
     */
    skip?: number
    distinct?: WorkPlanScalarFieldEnum | WorkPlanScalarFieldEnum[]
  }

  /**
   * WorkPlan create
   */
  export type WorkPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPlan
     */
    select?: WorkPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPlan
     */
    omit?: WorkPlanOmit<ExtArgs> | null
    /**
     * The data needed to create a WorkPlan.
     */
    data: XOR<WorkPlanCreateInput, WorkPlanUncheckedCreateInput>
  }

  /**
   * WorkPlan createMany
   */
  export type WorkPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkPlans.
     */
    data: WorkPlanCreateManyInput | WorkPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkPlan createManyAndReturn
   */
  export type WorkPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPlan
     */
    select?: WorkPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPlan
     */
    omit?: WorkPlanOmit<ExtArgs> | null
    /**
     * The data used to create many WorkPlans.
     */
    data: WorkPlanCreateManyInput | WorkPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkPlan update
   */
  export type WorkPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPlan
     */
    select?: WorkPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPlan
     */
    omit?: WorkPlanOmit<ExtArgs> | null
    /**
     * The data needed to update a WorkPlan.
     */
    data: XOR<WorkPlanUpdateInput, WorkPlanUncheckedUpdateInput>
    /**
     * Choose, which WorkPlan to update.
     */
    where: WorkPlanWhereUniqueInput
  }

  /**
   * WorkPlan updateMany
   */
  export type WorkPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkPlans.
     */
    data: XOR<WorkPlanUpdateManyMutationInput, WorkPlanUncheckedUpdateManyInput>
    /**
     * Filter which WorkPlans to update
     */
    where?: WorkPlanWhereInput
    /**
     * Limit how many WorkPlans to update.
     */
    limit?: number
  }

  /**
   * WorkPlan updateManyAndReturn
   */
  export type WorkPlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPlan
     */
    select?: WorkPlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPlan
     */
    omit?: WorkPlanOmit<ExtArgs> | null
    /**
     * The data used to update WorkPlans.
     */
    data: XOR<WorkPlanUpdateManyMutationInput, WorkPlanUncheckedUpdateManyInput>
    /**
     * Filter which WorkPlans to update
     */
    where?: WorkPlanWhereInput
    /**
     * Limit how many WorkPlans to update.
     */
    limit?: number
  }

  /**
   * WorkPlan upsert
   */
  export type WorkPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPlan
     */
    select?: WorkPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPlan
     */
    omit?: WorkPlanOmit<ExtArgs> | null
    /**
     * The filter to search for the WorkPlan to update in case it exists.
     */
    where: WorkPlanWhereUniqueInput
    /**
     * In case the WorkPlan found by the `where` argument doesn't exist, create a new WorkPlan with this data.
     */
    create: XOR<WorkPlanCreateInput, WorkPlanUncheckedCreateInput>
    /**
     * In case the WorkPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkPlanUpdateInput, WorkPlanUncheckedUpdateInput>
  }

  /**
   * WorkPlan delete
   */
  export type WorkPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPlan
     */
    select?: WorkPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPlan
     */
    omit?: WorkPlanOmit<ExtArgs> | null
    /**
     * Filter which WorkPlan to delete.
     */
    where: WorkPlanWhereUniqueInput
  }

  /**
   * WorkPlan deleteMany
   */
  export type WorkPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkPlans to delete
     */
    where?: WorkPlanWhereInput
    /**
     * Limit how many WorkPlans to delete.
     */
    limit?: number
  }

  /**
   * WorkPlan without action
   */
  export type WorkPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkPlan
     */
    select?: WorkPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkPlan
     */
    omit?: WorkPlanOmit<ExtArgs> | null
  }


  /**
   * Model WorkplaceInspection
   */

  export type AggregateWorkplaceInspection = {
    _count: WorkplaceInspectionCountAggregateOutputType | null
    _min: WorkplaceInspectionMinAggregateOutputType | null
    _max: WorkplaceInspectionMaxAggregateOutputType | null
  }

  export type WorkplaceInspectionMinAggregateOutputType = {
    id: string | null
    date: Date | null
    title: string | null
    number: string | null
    type: string | null
    inspector: string | null
    location: string | null
    deviations: string | null
    direct: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkplaceInspectionMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    title: string | null
    number: string | null
    type: string | null
    inspector: string | null
    location: string | null
    deviations: string | null
    direct: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkplaceInspectionCountAggregateOutputType = {
    id: number
    date: number
    title: number
    number: number
    type: number
    inspector: number
    location: number
    deviations: number
    direct: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WorkplaceInspectionMinAggregateInputType = {
    id?: true
    date?: true
    title?: true
    number?: true
    type?: true
    inspector?: true
    location?: true
    deviations?: true
    direct?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkplaceInspectionMaxAggregateInputType = {
    id?: true
    date?: true
    title?: true
    number?: true
    type?: true
    inspector?: true
    location?: true
    deviations?: true
    direct?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkplaceInspectionCountAggregateInputType = {
    id?: true
    date?: true
    title?: true
    number?: true
    type?: true
    inspector?: true
    location?: true
    deviations?: true
    direct?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkplaceInspectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkplaceInspection to aggregate.
     */
    where?: WorkplaceInspectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkplaceInspections to fetch.
     */
    orderBy?: WorkplaceInspectionOrderByWithRelationInput | WorkplaceInspectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkplaceInspectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkplaceInspections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkplaceInspections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkplaceInspections
    **/
    _count?: true | WorkplaceInspectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkplaceInspectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkplaceInspectionMaxAggregateInputType
  }

  export type GetWorkplaceInspectionAggregateType<T extends WorkplaceInspectionAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkplaceInspection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkplaceInspection[P]>
      : GetScalarType<T[P], AggregateWorkplaceInspection[P]>
  }




  export type WorkplaceInspectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkplaceInspectionWhereInput
    orderBy?: WorkplaceInspectionOrderByWithAggregationInput | WorkplaceInspectionOrderByWithAggregationInput[]
    by: WorkplaceInspectionScalarFieldEnum[] | WorkplaceInspectionScalarFieldEnum
    having?: WorkplaceInspectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkplaceInspectionCountAggregateInputType | true
    _min?: WorkplaceInspectionMinAggregateInputType
    _max?: WorkplaceInspectionMaxAggregateInputType
  }

  export type WorkplaceInspectionGroupByOutputType = {
    id: string
    date: Date
    title: string
    number: string
    type: string
    inspector: string
    location: string
    deviations: string | null
    direct: string | null
    createdAt: Date
    updatedAt: Date
    _count: WorkplaceInspectionCountAggregateOutputType | null
    _min: WorkplaceInspectionMinAggregateOutputType | null
    _max: WorkplaceInspectionMaxAggregateOutputType | null
  }

  type GetWorkplaceInspectionGroupByPayload<T extends WorkplaceInspectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkplaceInspectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkplaceInspectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkplaceInspectionGroupByOutputType[P]>
            : GetScalarType<T[P], WorkplaceInspectionGroupByOutputType[P]>
        }
      >
    >


  export type WorkplaceInspectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    title?: boolean
    number?: boolean
    type?: boolean
    inspector?: boolean
    location?: boolean
    deviations?: boolean
    direct?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["workplaceInspection"]>

  export type WorkplaceInspectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    title?: boolean
    number?: boolean
    type?: boolean
    inspector?: boolean
    location?: boolean
    deviations?: boolean
    direct?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["workplaceInspection"]>

  export type WorkplaceInspectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    title?: boolean
    number?: boolean
    type?: boolean
    inspector?: boolean
    location?: boolean
    deviations?: boolean
    direct?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["workplaceInspection"]>

  export type WorkplaceInspectionSelectScalar = {
    id?: boolean
    date?: boolean
    title?: boolean
    number?: boolean
    type?: boolean
    inspector?: boolean
    location?: boolean
    deviations?: boolean
    direct?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WorkplaceInspectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "title" | "number" | "type" | "inspector" | "location" | "deviations" | "direct" | "createdAt" | "updatedAt", ExtArgs["result"]["workplaceInspection"]>

  export type $WorkplaceInspectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkplaceInspection"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      title: string
      number: string
      type: string
      inspector: string
      location: string
      deviations: string | null
      direct: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["workplaceInspection"]>
    composites: {}
  }

  type WorkplaceInspectionGetPayload<S extends boolean | null | undefined | WorkplaceInspectionDefaultArgs> = $Result.GetResult<Prisma.$WorkplaceInspectionPayload, S>

  type WorkplaceInspectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkplaceInspectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkplaceInspectionCountAggregateInputType | true
    }

  export interface WorkplaceInspectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkplaceInspection'], meta: { name: 'WorkplaceInspection' } }
    /**
     * Find zero or one WorkplaceInspection that matches the filter.
     * @param {WorkplaceInspectionFindUniqueArgs} args - Arguments to find a WorkplaceInspection
     * @example
     * // Get one WorkplaceInspection
     * const workplaceInspection = await prisma.workplaceInspection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkplaceInspectionFindUniqueArgs>(args: SelectSubset<T, WorkplaceInspectionFindUniqueArgs<ExtArgs>>): Prisma__WorkplaceInspectionClient<$Result.GetResult<Prisma.$WorkplaceInspectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkplaceInspection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkplaceInspectionFindUniqueOrThrowArgs} args - Arguments to find a WorkplaceInspection
     * @example
     * // Get one WorkplaceInspection
     * const workplaceInspection = await prisma.workplaceInspection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkplaceInspectionFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkplaceInspectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkplaceInspectionClient<$Result.GetResult<Prisma.$WorkplaceInspectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkplaceInspection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkplaceInspectionFindFirstArgs} args - Arguments to find a WorkplaceInspection
     * @example
     * // Get one WorkplaceInspection
     * const workplaceInspection = await prisma.workplaceInspection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkplaceInspectionFindFirstArgs>(args?: SelectSubset<T, WorkplaceInspectionFindFirstArgs<ExtArgs>>): Prisma__WorkplaceInspectionClient<$Result.GetResult<Prisma.$WorkplaceInspectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkplaceInspection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkplaceInspectionFindFirstOrThrowArgs} args - Arguments to find a WorkplaceInspection
     * @example
     * // Get one WorkplaceInspection
     * const workplaceInspection = await prisma.workplaceInspection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkplaceInspectionFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkplaceInspectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkplaceInspectionClient<$Result.GetResult<Prisma.$WorkplaceInspectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkplaceInspections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkplaceInspectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkplaceInspections
     * const workplaceInspections = await prisma.workplaceInspection.findMany()
     * 
     * // Get first 10 WorkplaceInspections
     * const workplaceInspections = await prisma.workplaceInspection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workplaceInspectionWithIdOnly = await prisma.workplaceInspection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkplaceInspectionFindManyArgs>(args?: SelectSubset<T, WorkplaceInspectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkplaceInspectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkplaceInspection.
     * @param {WorkplaceInspectionCreateArgs} args - Arguments to create a WorkplaceInspection.
     * @example
     * // Create one WorkplaceInspection
     * const WorkplaceInspection = await prisma.workplaceInspection.create({
     *   data: {
     *     // ... data to create a WorkplaceInspection
     *   }
     * })
     * 
     */
    create<T extends WorkplaceInspectionCreateArgs>(args: SelectSubset<T, WorkplaceInspectionCreateArgs<ExtArgs>>): Prisma__WorkplaceInspectionClient<$Result.GetResult<Prisma.$WorkplaceInspectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkplaceInspections.
     * @param {WorkplaceInspectionCreateManyArgs} args - Arguments to create many WorkplaceInspections.
     * @example
     * // Create many WorkplaceInspections
     * const workplaceInspection = await prisma.workplaceInspection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkplaceInspectionCreateManyArgs>(args?: SelectSubset<T, WorkplaceInspectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkplaceInspections and returns the data saved in the database.
     * @param {WorkplaceInspectionCreateManyAndReturnArgs} args - Arguments to create many WorkplaceInspections.
     * @example
     * // Create many WorkplaceInspections
     * const workplaceInspection = await prisma.workplaceInspection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkplaceInspections and only return the `id`
     * const workplaceInspectionWithIdOnly = await prisma.workplaceInspection.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkplaceInspectionCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkplaceInspectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkplaceInspectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkplaceInspection.
     * @param {WorkplaceInspectionDeleteArgs} args - Arguments to delete one WorkplaceInspection.
     * @example
     * // Delete one WorkplaceInspection
     * const WorkplaceInspection = await prisma.workplaceInspection.delete({
     *   where: {
     *     // ... filter to delete one WorkplaceInspection
     *   }
     * })
     * 
     */
    delete<T extends WorkplaceInspectionDeleteArgs>(args: SelectSubset<T, WorkplaceInspectionDeleteArgs<ExtArgs>>): Prisma__WorkplaceInspectionClient<$Result.GetResult<Prisma.$WorkplaceInspectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkplaceInspection.
     * @param {WorkplaceInspectionUpdateArgs} args - Arguments to update one WorkplaceInspection.
     * @example
     * // Update one WorkplaceInspection
     * const workplaceInspection = await prisma.workplaceInspection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkplaceInspectionUpdateArgs>(args: SelectSubset<T, WorkplaceInspectionUpdateArgs<ExtArgs>>): Prisma__WorkplaceInspectionClient<$Result.GetResult<Prisma.$WorkplaceInspectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkplaceInspections.
     * @param {WorkplaceInspectionDeleteManyArgs} args - Arguments to filter WorkplaceInspections to delete.
     * @example
     * // Delete a few WorkplaceInspections
     * const { count } = await prisma.workplaceInspection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkplaceInspectionDeleteManyArgs>(args?: SelectSubset<T, WorkplaceInspectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkplaceInspections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkplaceInspectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkplaceInspections
     * const workplaceInspection = await prisma.workplaceInspection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkplaceInspectionUpdateManyArgs>(args: SelectSubset<T, WorkplaceInspectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkplaceInspections and returns the data updated in the database.
     * @param {WorkplaceInspectionUpdateManyAndReturnArgs} args - Arguments to update many WorkplaceInspections.
     * @example
     * // Update many WorkplaceInspections
     * const workplaceInspection = await prisma.workplaceInspection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkplaceInspections and only return the `id`
     * const workplaceInspectionWithIdOnly = await prisma.workplaceInspection.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkplaceInspectionUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkplaceInspectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkplaceInspectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkplaceInspection.
     * @param {WorkplaceInspectionUpsertArgs} args - Arguments to update or create a WorkplaceInspection.
     * @example
     * // Update or create a WorkplaceInspection
     * const workplaceInspection = await prisma.workplaceInspection.upsert({
     *   create: {
     *     // ... data to create a WorkplaceInspection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkplaceInspection we want to update
     *   }
     * })
     */
    upsert<T extends WorkplaceInspectionUpsertArgs>(args: SelectSubset<T, WorkplaceInspectionUpsertArgs<ExtArgs>>): Prisma__WorkplaceInspectionClient<$Result.GetResult<Prisma.$WorkplaceInspectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkplaceInspections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkplaceInspectionCountArgs} args - Arguments to filter WorkplaceInspections to count.
     * @example
     * // Count the number of WorkplaceInspections
     * const count = await prisma.workplaceInspection.count({
     *   where: {
     *     // ... the filter for the WorkplaceInspections we want to count
     *   }
     * })
    **/
    count<T extends WorkplaceInspectionCountArgs>(
      args?: Subset<T, WorkplaceInspectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkplaceInspectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkplaceInspection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkplaceInspectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkplaceInspectionAggregateArgs>(args: Subset<T, WorkplaceInspectionAggregateArgs>): Prisma.PrismaPromise<GetWorkplaceInspectionAggregateType<T>>

    /**
     * Group by WorkplaceInspection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkplaceInspectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkplaceInspectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkplaceInspectionGroupByArgs['orderBy'] }
        : { orderBy?: WorkplaceInspectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkplaceInspectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkplaceInspectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkplaceInspection model
   */
  readonly fields: WorkplaceInspectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkplaceInspection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkplaceInspectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkplaceInspection model
   */
  interface WorkplaceInspectionFieldRefs {
    readonly id: FieldRef<"WorkplaceInspection", 'String'>
    readonly date: FieldRef<"WorkplaceInspection", 'DateTime'>
    readonly title: FieldRef<"WorkplaceInspection", 'String'>
    readonly number: FieldRef<"WorkplaceInspection", 'String'>
    readonly type: FieldRef<"WorkplaceInspection", 'String'>
    readonly inspector: FieldRef<"WorkplaceInspection", 'String'>
    readonly location: FieldRef<"WorkplaceInspection", 'String'>
    readonly deviations: FieldRef<"WorkplaceInspection", 'String'>
    readonly direct: FieldRef<"WorkplaceInspection", 'String'>
    readonly createdAt: FieldRef<"WorkplaceInspection", 'DateTime'>
    readonly updatedAt: FieldRef<"WorkplaceInspection", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkplaceInspection findUnique
   */
  export type WorkplaceInspectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkplaceInspection
     */
    select?: WorkplaceInspectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkplaceInspection
     */
    omit?: WorkplaceInspectionOmit<ExtArgs> | null
    /**
     * Filter, which WorkplaceInspection to fetch.
     */
    where: WorkplaceInspectionWhereUniqueInput
  }

  /**
   * WorkplaceInspection findUniqueOrThrow
   */
  export type WorkplaceInspectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkplaceInspection
     */
    select?: WorkplaceInspectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkplaceInspection
     */
    omit?: WorkplaceInspectionOmit<ExtArgs> | null
    /**
     * Filter, which WorkplaceInspection to fetch.
     */
    where: WorkplaceInspectionWhereUniqueInput
  }

  /**
   * WorkplaceInspection findFirst
   */
  export type WorkplaceInspectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkplaceInspection
     */
    select?: WorkplaceInspectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkplaceInspection
     */
    omit?: WorkplaceInspectionOmit<ExtArgs> | null
    /**
     * Filter, which WorkplaceInspection to fetch.
     */
    where?: WorkplaceInspectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkplaceInspections to fetch.
     */
    orderBy?: WorkplaceInspectionOrderByWithRelationInput | WorkplaceInspectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkplaceInspections.
     */
    cursor?: WorkplaceInspectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkplaceInspections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkplaceInspections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkplaceInspections.
     */
    distinct?: WorkplaceInspectionScalarFieldEnum | WorkplaceInspectionScalarFieldEnum[]
  }

  /**
   * WorkplaceInspection findFirstOrThrow
   */
  export type WorkplaceInspectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkplaceInspection
     */
    select?: WorkplaceInspectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkplaceInspection
     */
    omit?: WorkplaceInspectionOmit<ExtArgs> | null
    /**
     * Filter, which WorkplaceInspection to fetch.
     */
    where?: WorkplaceInspectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkplaceInspections to fetch.
     */
    orderBy?: WorkplaceInspectionOrderByWithRelationInput | WorkplaceInspectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkplaceInspections.
     */
    cursor?: WorkplaceInspectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkplaceInspections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkplaceInspections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkplaceInspections.
     */
    distinct?: WorkplaceInspectionScalarFieldEnum | WorkplaceInspectionScalarFieldEnum[]
  }

  /**
   * WorkplaceInspection findMany
   */
  export type WorkplaceInspectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkplaceInspection
     */
    select?: WorkplaceInspectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkplaceInspection
     */
    omit?: WorkplaceInspectionOmit<ExtArgs> | null
    /**
     * Filter, which WorkplaceInspections to fetch.
     */
    where?: WorkplaceInspectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkplaceInspections to fetch.
     */
    orderBy?: WorkplaceInspectionOrderByWithRelationInput | WorkplaceInspectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkplaceInspections.
     */
    cursor?: WorkplaceInspectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkplaceInspections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkplaceInspections.
     */
    skip?: number
    distinct?: WorkplaceInspectionScalarFieldEnum | WorkplaceInspectionScalarFieldEnum[]
  }

  /**
   * WorkplaceInspection create
   */
  export type WorkplaceInspectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkplaceInspection
     */
    select?: WorkplaceInspectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkplaceInspection
     */
    omit?: WorkplaceInspectionOmit<ExtArgs> | null
    /**
     * The data needed to create a WorkplaceInspection.
     */
    data: XOR<WorkplaceInspectionCreateInput, WorkplaceInspectionUncheckedCreateInput>
  }

  /**
   * WorkplaceInspection createMany
   */
  export type WorkplaceInspectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkplaceInspections.
     */
    data: WorkplaceInspectionCreateManyInput | WorkplaceInspectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkplaceInspection createManyAndReturn
   */
  export type WorkplaceInspectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkplaceInspection
     */
    select?: WorkplaceInspectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkplaceInspection
     */
    omit?: WorkplaceInspectionOmit<ExtArgs> | null
    /**
     * The data used to create many WorkplaceInspections.
     */
    data: WorkplaceInspectionCreateManyInput | WorkplaceInspectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkplaceInspection update
   */
  export type WorkplaceInspectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkplaceInspection
     */
    select?: WorkplaceInspectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkplaceInspection
     */
    omit?: WorkplaceInspectionOmit<ExtArgs> | null
    /**
     * The data needed to update a WorkplaceInspection.
     */
    data: XOR<WorkplaceInspectionUpdateInput, WorkplaceInspectionUncheckedUpdateInput>
    /**
     * Choose, which WorkplaceInspection to update.
     */
    where: WorkplaceInspectionWhereUniqueInput
  }

  /**
   * WorkplaceInspection updateMany
   */
  export type WorkplaceInspectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkplaceInspections.
     */
    data: XOR<WorkplaceInspectionUpdateManyMutationInput, WorkplaceInspectionUncheckedUpdateManyInput>
    /**
     * Filter which WorkplaceInspections to update
     */
    where?: WorkplaceInspectionWhereInput
    /**
     * Limit how many WorkplaceInspections to update.
     */
    limit?: number
  }

  /**
   * WorkplaceInspection updateManyAndReturn
   */
  export type WorkplaceInspectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkplaceInspection
     */
    select?: WorkplaceInspectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkplaceInspection
     */
    omit?: WorkplaceInspectionOmit<ExtArgs> | null
    /**
     * The data used to update WorkplaceInspections.
     */
    data: XOR<WorkplaceInspectionUpdateManyMutationInput, WorkplaceInspectionUncheckedUpdateManyInput>
    /**
     * Filter which WorkplaceInspections to update
     */
    where?: WorkplaceInspectionWhereInput
    /**
     * Limit how many WorkplaceInspections to update.
     */
    limit?: number
  }

  /**
   * WorkplaceInspection upsert
   */
  export type WorkplaceInspectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkplaceInspection
     */
    select?: WorkplaceInspectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkplaceInspection
     */
    omit?: WorkplaceInspectionOmit<ExtArgs> | null
    /**
     * The filter to search for the WorkplaceInspection to update in case it exists.
     */
    where: WorkplaceInspectionWhereUniqueInput
    /**
     * In case the WorkplaceInspection found by the `where` argument doesn't exist, create a new WorkplaceInspection with this data.
     */
    create: XOR<WorkplaceInspectionCreateInput, WorkplaceInspectionUncheckedCreateInput>
    /**
     * In case the WorkplaceInspection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkplaceInspectionUpdateInput, WorkplaceInspectionUncheckedUpdateInput>
  }

  /**
   * WorkplaceInspection delete
   */
  export type WorkplaceInspectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkplaceInspection
     */
    select?: WorkplaceInspectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkplaceInspection
     */
    omit?: WorkplaceInspectionOmit<ExtArgs> | null
    /**
     * Filter which WorkplaceInspection to delete.
     */
    where: WorkplaceInspectionWhereUniqueInput
  }

  /**
   * WorkplaceInspection deleteMany
   */
  export type WorkplaceInspectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkplaceInspections to delete
     */
    where?: WorkplaceInspectionWhereInput
    /**
     * Limit how many WorkplaceInspections to delete.
     */
    limit?: number
  }

  /**
   * WorkplaceInspection without action
   */
  export type WorkplaceInspectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkplaceInspection
     */
    select?: WorkplaceInspectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkplaceInspection
     */
    omit?: WorkplaceInspectionOmit<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    date: Date | null
    planned: Date | null
    reference: string | null
    type: string | null
    description: string | null
    by: string | null
    status: string | null
    owner: string | null
    location: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    planned: Date | null
    reference: string | null
    type: string | null
    description: string | null
    by: string | null
    status: string | null
    owner: string | null
    location: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    date: number
    planned: number
    reference: number
    type: number
    description: number
    by: number
    status: number
    owner: number
    location: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    date?: true
    planned?: true
    reference?: true
    type?: true
    description?: true
    by?: true
    status?: true
    owner?: true
    location?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    date?: true
    planned?: true
    reference?: true
    type?: true
    description?: true
    by?: true
    status?: true
    owner?: true
    location?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    date?: true
    planned?: true
    reference?: true
    type?: true
    description?: true
    by?: true
    status?: true
    owner?: true
    location?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    date: Date
    planned: Date | null
    reference: string | null
    type: string
    description: string
    by: string
    status: string
    owner: string | null
    location: string | null
    createdAt: Date
    updatedAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    planned?: boolean
    reference?: boolean
    type?: boolean
    description?: boolean
    by?: boolean
    status?: boolean
    owner?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    planned?: boolean
    reference?: boolean
    type?: boolean
    description?: boolean
    by?: boolean
    status?: boolean
    owner?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    planned?: boolean
    reference?: boolean
    type?: boolean
    description?: boolean
    by?: boolean
    status?: boolean
    owner?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    date?: boolean
    planned?: boolean
    reference?: boolean
    type?: boolean
    description?: boolean
    by?: boolean
    status?: boolean
    owner?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "planned" | "reference" | "type" | "description" | "by" | "status" | "owner" | "location" | "createdAt" | "updatedAt", ExtArgs["result"]["notification"]>

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      planned: Date | null
      reference: string | null
      type: string
      description: string
      by: string
      status: string
      owner: string | null
      location: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly date: FieldRef<"Notification", 'DateTime'>
    readonly planned: FieldRef<"Notification", 'DateTime'>
    readonly reference: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly description: FieldRef<"Notification", 'String'>
    readonly by: FieldRef<"Notification", 'String'>
    readonly status: FieldRef<"Notification", 'String'>
    readonly owner: FieldRef<"Notification", 'String'>
    readonly location: FieldRef<"Notification", 'String'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
    readonly updatedAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
  }


  /**
   * Model Personnel
   */

  export type AggregatePersonnel = {
    _count: PersonnelCountAggregateOutputType | null
    _avg: PersonnelAvgAggregateOutputType | null
    _sum: PersonnelSumAggregateOutputType | null
    _min: PersonnelMinAggregateOutputType | null
    _max: PersonnelMaxAggregateOutputType | null
  }

  export type PersonnelAvgAggregateOutputType = {
    k: number | null
  }

  export type PersonnelSumAggregateOutputType = {
    k: number | null
  }

  export type PersonnelMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    mobile: string | null
    function: string | null
    endOfContract: string | null
    k: number | null
    b: string | null
    next: Date | null
    outOfService: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PersonnelMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    mobile: string | null
    function: string | null
    endOfContract: string | null
    k: number | null
    b: string | null
    next: Date | null
    outOfService: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PersonnelCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    mobile: number
    function: number
    endOfContract: number
    k: number
    b: number
    next: number
    outOfService: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PersonnelAvgAggregateInputType = {
    k?: true
  }

  export type PersonnelSumAggregateInputType = {
    k?: true
  }

  export type PersonnelMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    mobile?: true
    function?: true
    endOfContract?: true
    k?: true
    b?: true
    next?: true
    outOfService?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PersonnelMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    mobile?: true
    function?: true
    endOfContract?: true
    k?: true
    b?: true
    next?: true
    outOfService?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PersonnelCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    mobile?: true
    function?: true
    endOfContract?: true
    k?: true
    b?: true
    next?: true
    outOfService?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PersonnelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Personnel to aggregate.
     */
    where?: PersonnelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Personnel to fetch.
     */
    orderBy?: PersonnelOrderByWithRelationInput | PersonnelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PersonnelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Personnel from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Personnel.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Personnel
    **/
    _count?: true | PersonnelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PersonnelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PersonnelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PersonnelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PersonnelMaxAggregateInputType
  }

  export type GetPersonnelAggregateType<T extends PersonnelAggregateArgs> = {
        [P in keyof T & keyof AggregatePersonnel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePersonnel[P]>
      : GetScalarType<T[P], AggregatePersonnel[P]>
  }




  export type PersonnelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonnelWhereInput
    orderBy?: PersonnelOrderByWithAggregationInput | PersonnelOrderByWithAggregationInput[]
    by: PersonnelScalarFieldEnum[] | PersonnelScalarFieldEnum
    having?: PersonnelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PersonnelCountAggregateInputType | true
    _avg?: PersonnelAvgAggregateInputType
    _sum?: PersonnelSumAggregateInputType
    _min?: PersonnelMinAggregateInputType
    _max?: PersonnelMaxAggregateInputType
  }

  export type PersonnelGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    mobile: string | null
    function: string | null
    endOfContract: string | null
    k: number
    b: string | null
    next: Date | null
    outOfService: boolean
    createdAt: Date
    updatedAt: Date
    _count: PersonnelCountAggregateOutputType | null
    _avg: PersonnelAvgAggregateOutputType | null
    _sum: PersonnelSumAggregateOutputType | null
    _min: PersonnelMinAggregateOutputType | null
    _max: PersonnelMaxAggregateOutputType | null
  }

  type GetPersonnelGroupByPayload<T extends PersonnelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PersonnelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PersonnelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PersonnelGroupByOutputType[P]>
            : GetScalarType<T[P], PersonnelGroupByOutputType[P]>
        }
      >
    >


  export type PersonnelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    mobile?: boolean
    function?: boolean
    endOfContract?: boolean
    k?: boolean
    b?: boolean
    next?: boolean
    outOfService?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["personnel"]>

  export type PersonnelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    mobile?: boolean
    function?: boolean
    endOfContract?: boolean
    k?: boolean
    b?: boolean
    next?: boolean
    outOfService?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["personnel"]>

  export type PersonnelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    mobile?: boolean
    function?: boolean
    endOfContract?: boolean
    k?: boolean
    b?: boolean
    next?: boolean
    outOfService?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["personnel"]>

  export type PersonnelSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    mobile?: boolean
    function?: boolean
    endOfContract?: boolean
    k?: boolean
    b?: boolean
    next?: boolean
    outOfService?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PersonnelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "mobile" | "function" | "endOfContract" | "k" | "b" | "next" | "outOfService" | "createdAt" | "updatedAt", ExtArgs["result"]["personnel"]>

  export type $PersonnelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Personnel"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      mobile: string | null
      function: string | null
      endOfContract: string | null
      k: number
      b: string | null
      next: Date | null
      outOfService: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["personnel"]>
    composites: {}
  }

  type PersonnelGetPayload<S extends boolean | null | undefined | PersonnelDefaultArgs> = $Result.GetResult<Prisma.$PersonnelPayload, S>

  type PersonnelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PersonnelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PersonnelCountAggregateInputType | true
    }

  export interface PersonnelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Personnel'], meta: { name: 'Personnel' } }
    /**
     * Find zero or one Personnel that matches the filter.
     * @param {PersonnelFindUniqueArgs} args - Arguments to find a Personnel
     * @example
     * // Get one Personnel
     * const personnel = await prisma.personnel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PersonnelFindUniqueArgs>(args: SelectSubset<T, PersonnelFindUniqueArgs<ExtArgs>>): Prisma__PersonnelClient<$Result.GetResult<Prisma.$PersonnelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Personnel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PersonnelFindUniqueOrThrowArgs} args - Arguments to find a Personnel
     * @example
     * // Get one Personnel
     * const personnel = await prisma.personnel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PersonnelFindUniqueOrThrowArgs>(args: SelectSubset<T, PersonnelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PersonnelClient<$Result.GetResult<Prisma.$PersonnelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Personnel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonnelFindFirstArgs} args - Arguments to find a Personnel
     * @example
     * // Get one Personnel
     * const personnel = await prisma.personnel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PersonnelFindFirstArgs>(args?: SelectSubset<T, PersonnelFindFirstArgs<ExtArgs>>): Prisma__PersonnelClient<$Result.GetResult<Prisma.$PersonnelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Personnel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonnelFindFirstOrThrowArgs} args - Arguments to find a Personnel
     * @example
     * // Get one Personnel
     * const personnel = await prisma.personnel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PersonnelFindFirstOrThrowArgs>(args?: SelectSubset<T, PersonnelFindFirstOrThrowArgs<ExtArgs>>): Prisma__PersonnelClient<$Result.GetResult<Prisma.$PersonnelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Personnel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonnelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Personnel
     * const personnel = await prisma.personnel.findMany()
     * 
     * // Get first 10 Personnel
     * const personnel = await prisma.personnel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const personnelWithIdOnly = await prisma.personnel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PersonnelFindManyArgs>(args?: SelectSubset<T, PersonnelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonnelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Personnel.
     * @param {PersonnelCreateArgs} args - Arguments to create a Personnel.
     * @example
     * // Create one Personnel
     * const Personnel = await prisma.personnel.create({
     *   data: {
     *     // ... data to create a Personnel
     *   }
     * })
     * 
     */
    create<T extends PersonnelCreateArgs>(args: SelectSubset<T, PersonnelCreateArgs<ExtArgs>>): Prisma__PersonnelClient<$Result.GetResult<Prisma.$PersonnelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Personnel.
     * @param {PersonnelCreateManyArgs} args - Arguments to create many Personnel.
     * @example
     * // Create many Personnel
     * const personnel = await prisma.personnel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PersonnelCreateManyArgs>(args?: SelectSubset<T, PersonnelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Personnel and returns the data saved in the database.
     * @param {PersonnelCreateManyAndReturnArgs} args - Arguments to create many Personnel.
     * @example
     * // Create many Personnel
     * const personnel = await prisma.personnel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Personnel and only return the `id`
     * const personnelWithIdOnly = await prisma.personnel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PersonnelCreateManyAndReturnArgs>(args?: SelectSubset<T, PersonnelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonnelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Personnel.
     * @param {PersonnelDeleteArgs} args - Arguments to delete one Personnel.
     * @example
     * // Delete one Personnel
     * const Personnel = await prisma.personnel.delete({
     *   where: {
     *     // ... filter to delete one Personnel
     *   }
     * })
     * 
     */
    delete<T extends PersonnelDeleteArgs>(args: SelectSubset<T, PersonnelDeleteArgs<ExtArgs>>): Prisma__PersonnelClient<$Result.GetResult<Prisma.$PersonnelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Personnel.
     * @param {PersonnelUpdateArgs} args - Arguments to update one Personnel.
     * @example
     * // Update one Personnel
     * const personnel = await prisma.personnel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PersonnelUpdateArgs>(args: SelectSubset<T, PersonnelUpdateArgs<ExtArgs>>): Prisma__PersonnelClient<$Result.GetResult<Prisma.$PersonnelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Personnel.
     * @param {PersonnelDeleteManyArgs} args - Arguments to filter Personnel to delete.
     * @example
     * // Delete a few Personnel
     * const { count } = await prisma.personnel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PersonnelDeleteManyArgs>(args?: SelectSubset<T, PersonnelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Personnel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonnelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Personnel
     * const personnel = await prisma.personnel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PersonnelUpdateManyArgs>(args: SelectSubset<T, PersonnelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Personnel and returns the data updated in the database.
     * @param {PersonnelUpdateManyAndReturnArgs} args - Arguments to update many Personnel.
     * @example
     * // Update many Personnel
     * const personnel = await prisma.personnel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Personnel and only return the `id`
     * const personnelWithIdOnly = await prisma.personnel.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PersonnelUpdateManyAndReturnArgs>(args: SelectSubset<T, PersonnelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonnelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Personnel.
     * @param {PersonnelUpsertArgs} args - Arguments to update or create a Personnel.
     * @example
     * // Update or create a Personnel
     * const personnel = await prisma.personnel.upsert({
     *   create: {
     *     // ... data to create a Personnel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Personnel we want to update
     *   }
     * })
     */
    upsert<T extends PersonnelUpsertArgs>(args: SelectSubset<T, PersonnelUpsertArgs<ExtArgs>>): Prisma__PersonnelClient<$Result.GetResult<Prisma.$PersonnelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Personnel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonnelCountArgs} args - Arguments to filter Personnel to count.
     * @example
     * // Count the number of Personnel
     * const count = await prisma.personnel.count({
     *   where: {
     *     // ... the filter for the Personnel we want to count
     *   }
     * })
    **/
    count<T extends PersonnelCountArgs>(
      args?: Subset<T, PersonnelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PersonnelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Personnel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonnelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PersonnelAggregateArgs>(args: Subset<T, PersonnelAggregateArgs>): Prisma.PrismaPromise<GetPersonnelAggregateType<T>>

    /**
     * Group by Personnel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonnelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PersonnelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PersonnelGroupByArgs['orderBy'] }
        : { orderBy?: PersonnelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PersonnelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPersonnelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Personnel model
   */
  readonly fields: PersonnelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Personnel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PersonnelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Personnel model
   */
  interface PersonnelFieldRefs {
    readonly id: FieldRef<"Personnel", 'String'>
    readonly firstName: FieldRef<"Personnel", 'String'>
    readonly lastName: FieldRef<"Personnel", 'String'>
    readonly mobile: FieldRef<"Personnel", 'String'>
    readonly function: FieldRef<"Personnel", 'String'>
    readonly endOfContract: FieldRef<"Personnel", 'String'>
    readonly k: FieldRef<"Personnel", 'Int'>
    readonly b: FieldRef<"Personnel", 'String'>
    readonly next: FieldRef<"Personnel", 'DateTime'>
    readonly outOfService: FieldRef<"Personnel", 'Boolean'>
    readonly createdAt: FieldRef<"Personnel", 'DateTime'>
    readonly updatedAt: FieldRef<"Personnel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Personnel findUnique
   */
  export type PersonnelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personnel
     */
    select?: PersonnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Personnel
     */
    omit?: PersonnelOmit<ExtArgs> | null
    /**
     * Filter, which Personnel to fetch.
     */
    where: PersonnelWhereUniqueInput
  }

  /**
   * Personnel findUniqueOrThrow
   */
  export type PersonnelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personnel
     */
    select?: PersonnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Personnel
     */
    omit?: PersonnelOmit<ExtArgs> | null
    /**
     * Filter, which Personnel to fetch.
     */
    where: PersonnelWhereUniqueInput
  }

  /**
   * Personnel findFirst
   */
  export type PersonnelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personnel
     */
    select?: PersonnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Personnel
     */
    omit?: PersonnelOmit<ExtArgs> | null
    /**
     * Filter, which Personnel to fetch.
     */
    where?: PersonnelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Personnel to fetch.
     */
    orderBy?: PersonnelOrderByWithRelationInput | PersonnelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Personnel.
     */
    cursor?: PersonnelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Personnel from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Personnel.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Personnel.
     */
    distinct?: PersonnelScalarFieldEnum | PersonnelScalarFieldEnum[]
  }

  /**
   * Personnel findFirstOrThrow
   */
  export type PersonnelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personnel
     */
    select?: PersonnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Personnel
     */
    omit?: PersonnelOmit<ExtArgs> | null
    /**
     * Filter, which Personnel to fetch.
     */
    where?: PersonnelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Personnel to fetch.
     */
    orderBy?: PersonnelOrderByWithRelationInput | PersonnelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Personnel.
     */
    cursor?: PersonnelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Personnel from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Personnel.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Personnel.
     */
    distinct?: PersonnelScalarFieldEnum | PersonnelScalarFieldEnum[]
  }

  /**
   * Personnel findMany
   */
  export type PersonnelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personnel
     */
    select?: PersonnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Personnel
     */
    omit?: PersonnelOmit<ExtArgs> | null
    /**
     * Filter, which Personnel to fetch.
     */
    where?: PersonnelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Personnel to fetch.
     */
    orderBy?: PersonnelOrderByWithRelationInput | PersonnelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Personnel.
     */
    cursor?: PersonnelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Personnel from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Personnel.
     */
    skip?: number
    distinct?: PersonnelScalarFieldEnum | PersonnelScalarFieldEnum[]
  }

  /**
   * Personnel create
   */
  export type PersonnelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personnel
     */
    select?: PersonnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Personnel
     */
    omit?: PersonnelOmit<ExtArgs> | null
    /**
     * The data needed to create a Personnel.
     */
    data: XOR<PersonnelCreateInput, PersonnelUncheckedCreateInput>
  }

  /**
   * Personnel createMany
   */
  export type PersonnelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Personnel.
     */
    data: PersonnelCreateManyInput | PersonnelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Personnel createManyAndReturn
   */
  export type PersonnelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personnel
     */
    select?: PersonnelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Personnel
     */
    omit?: PersonnelOmit<ExtArgs> | null
    /**
     * The data used to create many Personnel.
     */
    data: PersonnelCreateManyInput | PersonnelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Personnel update
   */
  export type PersonnelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personnel
     */
    select?: PersonnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Personnel
     */
    omit?: PersonnelOmit<ExtArgs> | null
    /**
     * The data needed to update a Personnel.
     */
    data: XOR<PersonnelUpdateInput, PersonnelUncheckedUpdateInput>
    /**
     * Choose, which Personnel to update.
     */
    where: PersonnelWhereUniqueInput
  }

  /**
   * Personnel updateMany
   */
  export type PersonnelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Personnel.
     */
    data: XOR<PersonnelUpdateManyMutationInput, PersonnelUncheckedUpdateManyInput>
    /**
     * Filter which Personnel to update
     */
    where?: PersonnelWhereInput
    /**
     * Limit how many Personnel to update.
     */
    limit?: number
  }

  /**
   * Personnel updateManyAndReturn
   */
  export type PersonnelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personnel
     */
    select?: PersonnelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Personnel
     */
    omit?: PersonnelOmit<ExtArgs> | null
    /**
     * The data used to update Personnel.
     */
    data: XOR<PersonnelUpdateManyMutationInput, PersonnelUncheckedUpdateManyInput>
    /**
     * Filter which Personnel to update
     */
    where?: PersonnelWhereInput
    /**
     * Limit how many Personnel to update.
     */
    limit?: number
  }

  /**
   * Personnel upsert
   */
  export type PersonnelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personnel
     */
    select?: PersonnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Personnel
     */
    omit?: PersonnelOmit<ExtArgs> | null
    /**
     * The filter to search for the Personnel to update in case it exists.
     */
    where: PersonnelWhereUniqueInput
    /**
     * In case the Personnel found by the `where` argument doesn't exist, create a new Personnel with this data.
     */
    create: XOR<PersonnelCreateInput, PersonnelUncheckedCreateInput>
    /**
     * In case the Personnel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PersonnelUpdateInput, PersonnelUncheckedUpdateInput>
  }

  /**
   * Personnel delete
   */
  export type PersonnelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personnel
     */
    select?: PersonnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Personnel
     */
    omit?: PersonnelOmit<ExtArgs> | null
    /**
     * Filter which Personnel to delete.
     */
    where: PersonnelWhereUniqueInput
  }

  /**
   * Personnel deleteMany
   */
  export type PersonnelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Personnel to delete
     */
    where?: PersonnelWhereInput
    /**
     * Limit how many Personnel to delete.
     */
    limit?: number
  }

  /**
   * Personnel without action
   */
  export type PersonnelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personnel
     */
    select?: PersonnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Personnel
     */
    omit?: PersonnelOmit<ExtArgs> | null
  }


  /**
   * Model WorkEquipment
   */

  export type AggregateWorkEquipment = {
    _count: WorkEquipmentCountAggregateOutputType | null
    _min: WorkEquipmentMinAggregateOutputType | null
    _max: WorkEquipmentMaxAggregateOutputType | null
  }

  export type WorkEquipmentMinAggregateOutputType = {
    id: string | null
    type: string | null
    description: string | null
    identification: string | null
    operatingCompany: string | null
    next: Date | null
    d: string | null
    removed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkEquipmentMaxAggregateOutputType = {
    id: string | null
    type: string | null
    description: string | null
    identification: string | null
    operatingCompany: string | null
    next: Date | null
    d: string | null
    removed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkEquipmentCountAggregateOutputType = {
    id: number
    type: number
    description: number
    identification: number
    operatingCompany: number
    next: number
    d: number
    removed: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WorkEquipmentMinAggregateInputType = {
    id?: true
    type?: true
    description?: true
    identification?: true
    operatingCompany?: true
    next?: true
    d?: true
    removed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkEquipmentMaxAggregateInputType = {
    id?: true
    type?: true
    description?: true
    identification?: true
    operatingCompany?: true
    next?: true
    d?: true
    removed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkEquipmentCountAggregateInputType = {
    id?: true
    type?: true
    description?: true
    identification?: true
    operatingCompany?: true
    next?: true
    d?: true
    removed?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkEquipmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkEquipment to aggregate.
     */
    where?: WorkEquipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkEquipments to fetch.
     */
    orderBy?: WorkEquipmentOrderByWithRelationInput | WorkEquipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkEquipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkEquipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkEquipments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkEquipments
    **/
    _count?: true | WorkEquipmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkEquipmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkEquipmentMaxAggregateInputType
  }

  export type GetWorkEquipmentAggregateType<T extends WorkEquipmentAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkEquipment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkEquipment[P]>
      : GetScalarType<T[P], AggregateWorkEquipment[P]>
  }




  export type WorkEquipmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkEquipmentWhereInput
    orderBy?: WorkEquipmentOrderByWithAggregationInput | WorkEquipmentOrderByWithAggregationInput[]
    by: WorkEquipmentScalarFieldEnum[] | WorkEquipmentScalarFieldEnum
    having?: WorkEquipmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkEquipmentCountAggregateInputType | true
    _min?: WorkEquipmentMinAggregateInputType
    _max?: WorkEquipmentMaxAggregateInputType
  }

  export type WorkEquipmentGroupByOutputType = {
    id: string
    type: string
    description: string
    identification: string | null
    operatingCompany: string | null
    next: Date | null
    d: string | null
    removed: boolean
    createdAt: Date
    updatedAt: Date
    _count: WorkEquipmentCountAggregateOutputType | null
    _min: WorkEquipmentMinAggregateOutputType | null
    _max: WorkEquipmentMaxAggregateOutputType | null
  }

  type GetWorkEquipmentGroupByPayload<T extends WorkEquipmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkEquipmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkEquipmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkEquipmentGroupByOutputType[P]>
            : GetScalarType<T[P], WorkEquipmentGroupByOutputType[P]>
        }
      >
    >


  export type WorkEquipmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    description?: boolean
    identification?: boolean
    operatingCompany?: boolean
    next?: boolean
    d?: boolean
    removed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["workEquipment"]>

  export type WorkEquipmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    description?: boolean
    identification?: boolean
    operatingCompany?: boolean
    next?: boolean
    d?: boolean
    removed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["workEquipment"]>

  export type WorkEquipmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    description?: boolean
    identification?: boolean
    operatingCompany?: boolean
    next?: boolean
    d?: boolean
    removed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["workEquipment"]>

  export type WorkEquipmentSelectScalar = {
    id?: boolean
    type?: boolean
    description?: boolean
    identification?: boolean
    operatingCompany?: boolean
    next?: boolean
    d?: boolean
    removed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WorkEquipmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "description" | "identification" | "operatingCompany" | "next" | "d" | "removed" | "createdAt" | "updatedAt", ExtArgs["result"]["workEquipment"]>

  export type $WorkEquipmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkEquipment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      description: string
      identification: string | null
      operatingCompany: string | null
      next: Date | null
      d: string | null
      removed: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["workEquipment"]>
    composites: {}
  }

  type WorkEquipmentGetPayload<S extends boolean | null | undefined | WorkEquipmentDefaultArgs> = $Result.GetResult<Prisma.$WorkEquipmentPayload, S>

  type WorkEquipmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkEquipmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkEquipmentCountAggregateInputType | true
    }

  export interface WorkEquipmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkEquipment'], meta: { name: 'WorkEquipment' } }
    /**
     * Find zero or one WorkEquipment that matches the filter.
     * @param {WorkEquipmentFindUniqueArgs} args - Arguments to find a WorkEquipment
     * @example
     * // Get one WorkEquipment
     * const workEquipment = await prisma.workEquipment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkEquipmentFindUniqueArgs>(args: SelectSubset<T, WorkEquipmentFindUniqueArgs<ExtArgs>>): Prisma__WorkEquipmentClient<$Result.GetResult<Prisma.$WorkEquipmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkEquipment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkEquipmentFindUniqueOrThrowArgs} args - Arguments to find a WorkEquipment
     * @example
     * // Get one WorkEquipment
     * const workEquipment = await prisma.workEquipment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkEquipmentFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkEquipmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkEquipmentClient<$Result.GetResult<Prisma.$WorkEquipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkEquipment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkEquipmentFindFirstArgs} args - Arguments to find a WorkEquipment
     * @example
     * // Get one WorkEquipment
     * const workEquipment = await prisma.workEquipment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkEquipmentFindFirstArgs>(args?: SelectSubset<T, WorkEquipmentFindFirstArgs<ExtArgs>>): Prisma__WorkEquipmentClient<$Result.GetResult<Prisma.$WorkEquipmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkEquipment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkEquipmentFindFirstOrThrowArgs} args - Arguments to find a WorkEquipment
     * @example
     * // Get one WorkEquipment
     * const workEquipment = await prisma.workEquipment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkEquipmentFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkEquipmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkEquipmentClient<$Result.GetResult<Prisma.$WorkEquipmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkEquipments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkEquipmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkEquipments
     * const workEquipments = await prisma.workEquipment.findMany()
     * 
     * // Get first 10 WorkEquipments
     * const workEquipments = await prisma.workEquipment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workEquipmentWithIdOnly = await prisma.workEquipment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkEquipmentFindManyArgs>(args?: SelectSubset<T, WorkEquipmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkEquipmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkEquipment.
     * @param {WorkEquipmentCreateArgs} args - Arguments to create a WorkEquipment.
     * @example
     * // Create one WorkEquipment
     * const WorkEquipment = await prisma.workEquipment.create({
     *   data: {
     *     // ... data to create a WorkEquipment
     *   }
     * })
     * 
     */
    create<T extends WorkEquipmentCreateArgs>(args: SelectSubset<T, WorkEquipmentCreateArgs<ExtArgs>>): Prisma__WorkEquipmentClient<$Result.GetResult<Prisma.$WorkEquipmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkEquipments.
     * @param {WorkEquipmentCreateManyArgs} args - Arguments to create many WorkEquipments.
     * @example
     * // Create many WorkEquipments
     * const workEquipment = await prisma.workEquipment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkEquipmentCreateManyArgs>(args?: SelectSubset<T, WorkEquipmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkEquipments and returns the data saved in the database.
     * @param {WorkEquipmentCreateManyAndReturnArgs} args - Arguments to create many WorkEquipments.
     * @example
     * // Create many WorkEquipments
     * const workEquipment = await prisma.workEquipment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkEquipments and only return the `id`
     * const workEquipmentWithIdOnly = await prisma.workEquipment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkEquipmentCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkEquipmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkEquipmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkEquipment.
     * @param {WorkEquipmentDeleteArgs} args - Arguments to delete one WorkEquipment.
     * @example
     * // Delete one WorkEquipment
     * const WorkEquipment = await prisma.workEquipment.delete({
     *   where: {
     *     // ... filter to delete one WorkEquipment
     *   }
     * })
     * 
     */
    delete<T extends WorkEquipmentDeleteArgs>(args: SelectSubset<T, WorkEquipmentDeleteArgs<ExtArgs>>): Prisma__WorkEquipmentClient<$Result.GetResult<Prisma.$WorkEquipmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkEquipment.
     * @param {WorkEquipmentUpdateArgs} args - Arguments to update one WorkEquipment.
     * @example
     * // Update one WorkEquipment
     * const workEquipment = await prisma.workEquipment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkEquipmentUpdateArgs>(args: SelectSubset<T, WorkEquipmentUpdateArgs<ExtArgs>>): Prisma__WorkEquipmentClient<$Result.GetResult<Prisma.$WorkEquipmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkEquipments.
     * @param {WorkEquipmentDeleteManyArgs} args - Arguments to filter WorkEquipments to delete.
     * @example
     * // Delete a few WorkEquipments
     * const { count } = await prisma.workEquipment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkEquipmentDeleteManyArgs>(args?: SelectSubset<T, WorkEquipmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkEquipments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkEquipmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkEquipments
     * const workEquipment = await prisma.workEquipment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkEquipmentUpdateManyArgs>(args: SelectSubset<T, WorkEquipmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkEquipments and returns the data updated in the database.
     * @param {WorkEquipmentUpdateManyAndReturnArgs} args - Arguments to update many WorkEquipments.
     * @example
     * // Update many WorkEquipments
     * const workEquipment = await prisma.workEquipment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkEquipments and only return the `id`
     * const workEquipmentWithIdOnly = await prisma.workEquipment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorkEquipmentUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkEquipmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkEquipmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkEquipment.
     * @param {WorkEquipmentUpsertArgs} args - Arguments to update or create a WorkEquipment.
     * @example
     * // Update or create a WorkEquipment
     * const workEquipment = await prisma.workEquipment.upsert({
     *   create: {
     *     // ... data to create a WorkEquipment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkEquipment we want to update
     *   }
     * })
     */
    upsert<T extends WorkEquipmentUpsertArgs>(args: SelectSubset<T, WorkEquipmentUpsertArgs<ExtArgs>>): Prisma__WorkEquipmentClient<$Result.GetResult<Prisma.$WorkEquipmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkEquipments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkEquipmentCountArgs} args - Arguments to filter WorkEquipments to count.
     * @example
     * // Count the number of WorkEquipments
     * const count = await prisma.workEquipment.count({
     *   where: {
     *     // ... the filter for the WorkEquipments we want to count
     *   }
     * })
    **/
    count<T extends WorkEquipmentCountArgs>(
      args?: Subset<T, WorkEquipmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkEquipmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkEquipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkEquipmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkEquipmentAggregateArgs>(args: Subset<T, WorkEquipmentAggregateArgs>): Prisma.PrismaPromise<GetWorkEquipmentAggregateType<T>>

    /**
     * Group by WorkEquipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkEquipmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkEquipmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkEquipmentGroupByArgs['orderBy'] }
        : { orderBy?: WorkEquipmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkEquipmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkEquipmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkEquipment model
   */
  readonly fields: WorkEquipmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkEquipment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkEquipmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WorkEquipment model
   */
  interface WorkEquipmentFieldRefs {
    readonly id: FieldRef<"WorkEquipment", 'String'>
    readonly type: FieldRef<"WorkEquipment", 'String'>
    readonly description: FieldRef<"WorkEquipment", 'String'>
    readonly identification: FieldRef<"WorkEquipment", 'String'>
    readonly operatingCompany: FieldRef<"WorkEquipment", 'String'>
    readonly next: FieldRef<"WorkEquipment", 'DateTime'>
    readonly d: FieldRef<"WorkEquipment", 'String'>
    readonly removed: FieldRef<"WorkEquipment", 'Boolean'>
    readonly createdAt: FieldRef<"WorkEquipment", 'DateTime'>
    readonly updatedAt: FieldRef<"WorkEquipment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkEquipment findUnique
   */
  export type WorkEquipmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkEquipment
     */
    select?: WorkEquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkEquipment
     */
    omit?: WorkEquipmentOmit<ExtArgs> | null
    /**
     * Filter, which WorkEquipment to fetch.
     */
    where: WorkEquipmentWhereUniqueInput
  }

  /**
   * WorkEquipment findUniqueOrThrow
   */
  export type WorkEquipmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkEquipment
     */
    select?: WorkEquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkEquipment
     */
    omit?: WorkEquipmentOmit<ExtArgs> | null
    /**
     * Filter, which WorkEquipment to fetch.
     */
    where: WorkEquipmentWhereUniqueInput
  }

  /**
   * WorkEquipment findFirst
   */
  export type WorkEquipmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkEquipment
     */
    select?: WorkEquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkEquipment
     */
    omit?: WorkEquipmentOmit<ExtArgs> | null
    /**
     * Filter, which WorkEquipment to fetch.
     */
    where?: WorkEquipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkEquipments to fetch.
     */
    orderBy?: WorkEquipmentOrderByWithRelationInput | WorkEquipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkEquipments.
     */
    cursor?: WorkEquipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkEquipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkEquipments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkEquipments.
     */
    distinct?: WorkEquipmentScalarFieldEnum | WorkEquipmentScalarFieldEnum[]
  }

  /**
   * WorkEquipment findFirstOrThrow
   */
  export type WorkEquipmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkEquipment
     */
    select?: WorkEquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkEquipment
     */
    omit?: WorkEquipmentOmit<ExtArgs> | null
    /**
     * Filter, which WorkEquipment to fetch.
     */
    where?: WorkEquipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkEquipments to fetch.
     */
    orderBy?: WorkEquipmentOrderByWithRelationInput | WorkEquipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkEquipments.
     */
    cursor?: WorkEquipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkEquipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkEquipments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkEquipments.
     */
    distinct?: WorkEquipmentScalarFieldEnum | WorkEquipmentScalarFieldEnum[]
  }

  /**
   * WorkEquipment findMany
   */
  export type WorkEquipmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkEquipment
     */
    select?: WorkEquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkEquipment
     */
    omit?: WorkEquipmentOmit<ExtArgs> | null
    /**
     * Filter, which WorkEquipments to fetch.
     */
    where?: WorkEquipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkEquipments to fetch.
     */
    orderBy?: WorkEquipmentOrderByWithRelationInput | WorkEquipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkEquipments.
     */
    cursor?: WorkEquipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkEquipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkEquipments.
     */
    skip?: number
    distinct?: WorkEquipmentScalarFieldEnum | WorkEquipmentScalarFieldEnum[]
  }

  /**
   * WorkEquipment create
   */
  export type WorkEquipmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkEquipment
     */
    select?: WorkEquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkEquipment
     */
    omit?: WorkEquipmentOmit<ExtArgs> | null
    /**
     * The data needed to create a WorkEquipment.
     */
    data: XOR<WorkEquipmentCreateInput, WorkEquipmentUncheckedCreateInput>
  }

  /**
   * WorkEquipment createMany
   */
  export type WorkEquipmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkEquipments.
     */
    data: WorkEquipmentCreateManyInput | WorkEquipmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkEquipment createManyAndReturn
   */
  export type WorkEquipmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkEquipment
     */
    select?: WorkEquipmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkEquipment
     */
    omit?: WorkEquipmentOmit<ExtArgs> | null
    /**
     * The data used to create many WorkEquipments.
     */
    data: WorkEquipmentCreateManyInput | WorkEquipmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkEquipment update
   */
  export type WorkEquipmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkEquipment
     */
    select?: WorkEquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkEquipment
     */
    omit?: WorkEquipmentOmit<ExtArgs> | null
    /**
     * The data needed to update a WorkEquipment.
     */
    data: XOR<WorkEquipmentUpdateInput, WorkEquipmentUncheckedUpdateInput>
    /**
     * Choose, which WorkEquipment to update.
     */
    where: WorkEquipmentWhereUniqueInput
  }

  /**
   * WorkEquipment updateMany
   */
  export type WorkEquipmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkEquipments.
     */
    data: XOR<WorkEquipmentUpdateManyMutationInput, WorkEquipmentUncheckedUpdateManyInput>
    /**
     * Filter which WorkEquipments to update
     */
    where?: WorkEquipmentWhereInput
    /**
     * Limit how many WorkEquipments to update.
     */
    limit?: number
  }

  /**
   * WorkEquipment updateManyAndReturn
   */
  export type WorkEquipmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkEquipment
     */
    select?: WorkEquipmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkEquipment
     */
    omit?: WorkEquipmentOmit<ExtArgs> | null
    /**
     * The data used to update WorkEquipments.
     */
    data: XOR<WorkEquipmentUpdateManyMutationInput, WorkEquipmentUncheckedUpdateManyInput>
    /**
     * Filter which WorkEquipments to update
     */
    where?: WorkEquipmentWhereInput
    /**
     * Limit how many WorkEquipments to update.
     */
    limit?: number
  }

  /**
   * WorkEquipment upsert
   */
  export type WorkEquipmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkEquipment
     */
    select?: WorkEquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkEquipment
     */
    omit?: WorkEquipmentOmit<ExtArgs> | null
    /**
     * The filter to search for the WorkEquipment to update in case it exists.
     */
    where: WorkEquipmentWhereUniqueInput
    /**
     * In case the WorkEquipment found by the `where` argument doesn't exist, create a new WorkEquipment with this data.
     */
    create: XOR<WorkEquipmentCreateInput, WorkEquipmentUncheckedCreateInput>
    /**
     * In case the WorkEquipment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkEquipmentUpdateInput, WorkEquipmentUncheckedUpdateInput>
  }

  /**
   * WorkEquipment delete
   */
  export type WorkEquipmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkEquipment
     */
    select?: WorkEquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkEquipment
     */
    omit?: WorkEquipmentOmit<ExtArgs> | null
    /**
     * Filter which WorkEquipment to delete.
     */
    where: WorkEquipmentWhereUniqueInput
  }

  /**
   * WorkEquipment deleteMany
   */
  export type WorkEquipmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkEquipments to delete
     */
    where?: WorkEquipmentWhereInput
    /**
     * Limit how many WorkEquipments to delete.
     */
    limit?: number
  }

  /**
   * WorkEquipment without action
   */
  export type WorkEquipmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkEquipment
     */
    select?: WorkEquipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkEquipment
     */
    omit?: WorkEquipmentOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const WorkPlanScalarFieldEnum: {
    id: 'id',
    start: 'start',
    end: 'end',
    title: 'title',
    number: 'number',
    location: 'location',
    address: 'address',
    type: 'type',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WorkPlanScalarFieldEnum = (typeof WorkPlanScalarFieldEnum)[keyof typeof WorkPlanScalarFieldEnum]


  export const WorkplaceInspectionScalarFieldEnum: {
    id: 'id',
    date: 'date',
    title: 'title',
    number: 'number',
    type: 'type',
    inspector: 'inspector',
    location: 'location',
    deviations: 'deviations',
    direct: 'direct',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WorkplaceInspectionScalarFieldEnum = (typeof WorkplaceInspectionScalarFieldEnum)[keyof typeof WorkplaceInspectionScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    date: 'date',
    planned: 'planned',
    reference: 'reference',
    type: 'type',
    description: 'description',
    by: 'by',
    status: 'status',
    owner: 'owner',
    location: 'location',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const PersonnelScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    mobile: 'mobile',
    function: 'function',
    endOfContract: 'endOfContract',
    k: 'k',
    b: 'b',
    next: 'next',
    outOfService: 'outOfService',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PersonnelScalarFieldEnum = (typeof PersonnelScalarFieldEnum)[keyof typeof PersonnelScalarFieldEnum]


  export const WorkEquipmentScalarFieldEnum: {
    id: 'id',
    type: 'type',
    description: 'description',
    identification: 'identification',
    operatingCompany: 'operatingCompany',
    next: 'next',
    d: 'd',
    removed: 'removed',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WorkEquipmentScalarFieldEnum = (typeof WorkEquipmentScalarFieldEnum)[keyof typeof WorkEquipmentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type WorkPlanWhereInput = {
    AND?: WorkPlanWhereInput | WorkPlanWhereInput[]
    OR?: WorkPlanWhereInput[]
    NOT?: WorkPlanWhereInput | WorkPlanWhereInput[]
    id?: StringFilter<"WorkPlan"> | string
    start?: DateTimeFilter<"WorkPlan"> | Date | string
    end?: DateTimeFilter<"WorkPlan"> | Date | string
    title?: StringFilter<"WorkPlan"> | string
    number?: StringFilter<"WorkPlan"> | string
    location?: StringFilter<"WorkPlan"> | string
    address?: StringFilter<"WorkPlan"> | string
    type?: StringFilter<"WorkPlan"> | string
    createdAt?: DateTimeFilter<"WorkPlan"> | Date | string
    updatedAt?: DateTimeFilter<"WorkPlan"> | Date | string
  }

  export type WorkPlanOrderByWithRelationInput = {
    id?: SortOrder
    start?: SortOrder
    end?: SortOrder
    title?: SortOrder
    number?: SortOrder
    location?: SortOrder
    address?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkPlanWhereInput | WorkPlanWhereInput[]
    OR?: WorkPlanWhereInput[]
    NOT?: WorkPlanWhereInput | WorkPlanWhereInput[]
    start?: DateTimeFilter<"WorkPlan"> | Date | string
    end?: DateTimeFilter<"WorkPlan"> | Date | string
    title?: StringFilter<"WorkPlan"> | string
    number?: StringFilter<"WorkPlan"> | string
    location?: StringFilter<"WorkPlan"> | string
    address?: StringFilter<"WorkPlan"> | string
    type?: StringFilter<"WorkPlan"> | string
    createdAt?: DateTimeFilter<"WorkPlan"> | Date | string
    updatedAt?: DateTimeFilter<"WorkPlan"> | Date | string
  }, "id">

  export type WorkPlanOrderByWithAggregationInput = {
    id?: SortOrder
    start?: SortOrder
    end?: SortOrder
    title?: SortOrder
    number?: SortOrder
    location?: SortOrder
    address?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WorkPlanCountOrderByAggregateInput
    _max?: WorkPlanMaxOrderByAggregateInput
    _min?: WorkPlanMinOrderByAggregateInput
  }

  export type WorkPlanScalarWhereWithAggregatesInput = {
    AND?: WorkPlanScalarWhereWithAggregatesInput | WorkPlanScalarWhereWithAggregatesInput[]
    OR?: WorkPlanScalarWhereWithAggregatesInput[]
    NOT?: WorkPlanScalarWhereWithAggregatesInput | WorkPlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkPlan"> | string
    start?: DateTimeWithAggregatesFilter<"WorkPlan"> | Date | string
    end?: DateTimeWithAggregatesFilter<"WorkPlan"> | Date | string
    title?: StringWithAggregatesFilter<"WorkPlan"> | string
    number?: StringWithAggregatesFilter<"WorkPlan"> | string
    location?: StringWithAggregatesFilter<"WorkPlan"> | string
    address?: StringWithAggregatesFilter<"WorkPlan"> | string
    type?: StringWithAggregatesFilter<"WorkPlan"> | string
    createdAt?: DateTimeWithAggregatesFilter<"WorkPlan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WorkPlan"> | Date | string
  }

  export type WorkplaceInspectionWhereInput = {
    AND?: WorkplaceInspectionWhereInput | WorkplaceInspectionWhereInput[]
    OR?: WorkplaceInspectionWhereInput[]
    NOT?: WorkplaceInspectionWhereInput | WorkplaceInspectionWhereInput[]
    id?: StringFilter<"WorkplaceInspection"> | string
    date?: DateTimeFilter<"WorkplaceInspection"> | Date | string
    title?: StringFilter<"WorkplaceInspection"> | string
    number?: StringFilter<"WorkplaceInspection"> | string
    type?: StringFilter<"WorkplaceInspection"> | string
    inspector?: StringFilter<"WorkplaceInspection"> | string
    location?: StringFilter<"WorkplaceInspection"> | string
    deviations?: StringNullableFilter<"WorkplaceInspection"> | string | null
    direct?: StringNullableFilter<"WorkplaceInspection"> | string | null
    createdAt?: DateTimeFilter<"WorkplaceInspection"> | Date | string
    updatedAt?: DateTimeFilter<"WorkplaceInspection"> | Date | string
  }

  export type WorkplaceInspectionOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    title?: SortOrder
    number?: SortOrder
    type?: SortOrder
    inspector?: SortOrder
    location?: SortOrder
    deviations?: SortOrderInput | SortOrder
    direct?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkplaceInspectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkplaceInspectionWhereInput | WorkplaceInspectionWhereInput[]
    OR?: WorkplaceInspectionWhereInput[]
    NOT?: WorkplaceInspectionWhereInput | WorkplaceInspectionWhereInput[]
    date?: DateTimeFilter<"WorkplaceInspection"> | Date | string
    title?: StringFilter<"WorkplaceInspection"> | string
    number?: StringFilter<"WorkplaceInspection"> | string
    type?: StringFilter<"WorkplaceInspection"> | string
    inspector?: StringFilter<"WorkplaceInspection"> | string
    location?: StringFilter<"WorkplaceInspection"> | string
    deviations?: StringNullableFilter<"WorkplaceInspection"> | string | null
    direct?: StringNullableFilter<"WorkplaceInspection"> | string | null
    createdAt?: DateTimeFilter<"WorkplaceInspection"> | Date | string
    updatedAt?: DateTimeFilter<"WorkplaceInspection"> | Date | string
  }, "id">

  export type WorkplaceInspectionOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    title?: SortOrder
    number?: SortOrder
    type?: SortOrder
    inspector?: SortOrder
    location?: SortOrder
    deviations?: SortOrderInput | SortOrder
    direct?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WorkplaceInspectionCountOrderByAggregateInput
    _max?: WorkplaceInspectionMaxOrderByAggregateInput
    _min?: WorkplaceInspectionMinOrderByAggregateInput
  }

  export type WorkplaceInspectionScalarWhereWithAggregatesInput = {
    AND?: WorkplaceInspectionScalarWhereWithAggregatesInput | WorkplaceInspectionScalarWhereWithAggregatesInput[]
    OR?: WorkplaceInspectionScalarWhereWithAggregatesInput[]
    NOT?: WorkplaceInspectionScalarWhereWithAggregatesInput | WorkplaceInspectionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkplaceInspection"> | string
    date?: DateTimeWithAggregatesFilter<"WorkplaceInspection"> | Date | string
    title?: StringWithAggregatesFilter<"WorkplaceInspection"> | string
    number?: StringWithAggregatesFilter<"WorkplaceInspection"> | string
    type?: StringWithAggregatesFilter<"WorkplaceInspection"> | string
    inspector?: StringWithAggregatesFilter<"WorkplaceInspection"> | string
    location?: StringWithAggregatesFilter<"WorkplaceInspection"> | string
    deviations?: StringNullableWithAggregatesFilter<"WorkplaceInspection"> | string | null
    direct?: StringNullableWithAggregatesFilter<"WorkplaceInspection"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WorkplaceInspection"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WorkplaceInspection"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    date?: DateTimeFilter<"Notification"> | Date | string
    planned?: DateTimeNullableFilter<"Notification"> | Date | string | null
    reference?: StringNullableFilter<"Notification"> | string | null
    type?: StringFilter<"Notification"> | string
    description?: StringFilter<"Notification"> | string
    by?: StringFilter<"Notification"> | string
    status?: StringFilter<"Notification"> | string
    owner?: StringNullableFilter<"Notification"> | string | null
    location?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    planned?: SortOrderInput | SortOrder
    reference?: SortOrderInput | SortOrder
    type?: SortOrder
    description?: SortOrder
    by?: SortOrder
    status?: SortOrder
    owner?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    date?: DateTimeFilter<"Notification"> | Date | string
    planned?: DateTimeNullableFilter<"Notification"> | Date | string | null
    reference?: StringNullableFilter<"Notification"> | string | null
    type?: StringFilter<"Notification"> | string
    description?: StringFilter<"Notification"> | string
    by?: StringFilter<"Notification"> | string
    status?: StringFilter<"Notification"> | string
    owner?: StringNullableFilter<"Notification"> | string | null
    location?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    planned?: SortOrderInput | SortOrder
    reference?: SortOrderInput | SortOrder
    type?: SortOrder
    description?: SortOrder
    by?: SortOrder
    status?: SortOrder
    owner?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    date?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
    planned?: DateTimeNullableWithAggregatesFilter<"Notification"> | Date | string | null
    reference?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    type?: StringWithAggregatesFilter<"Notification"> | string
    description?: StringWithAggregatesFilter<"Notification"> | string
    by?: StringWithAggregatesFilter<"Notification"> | string
    status?: StringWithAggregatesFilter<"Notification"> | string
    owner?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    location?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type PersonnelWhereInput = {
    AND?: PersonnelWhereInput | PersonnelWhereInput[]
    OR?: PersonnelWhereInput[]
    NOT?: PersonnelWhereInput | PersonnelWhereInput[]
    id?: StringFilter<"Personnel"> | string
    firstName?: StringFilter<"Personnel"> | string
    lastName?: StringFilter<"Personnel"> | string
    mobile?: StringNullableFilter<"Personnel"> | string | null
    function?: StringNullableFilter<"Personnel"> | string | null
    endOfContract?: StringNullableFilter<"Personnel"> | string | null
    k?: IntFilter<"Personnel"> | number
    b?: StringNullableFilter<"Personnel"> | string | null
    next?: DateTimeNullableFilter<"Personnel"> | Date | string | null
    outOfService?: BoolFilter<"Personnel"> | boolean
    createdAt?: DateTimeFilter<"Personnel"> | Date | string
    updatedAt?: DateTimeFilter<"Personnel"> | Date | string
  }

  export type PersonnelOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    mobile?: SortOrderInput | SortOrder
    function?: SortOrderInput | SortOrder
    endOfContract?: SortOrderInput | SortOrder
    k?: SortOrder
    b?: SortOrderInput | SortOrder
    next?: SortOrderInput | SortOrder
    outOfService?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PersonnelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PersonnelWhereInput | PersonnelWhereInput[]
    OR?: PersonnelWhereInput[]
    NOT?: PersonnelWhereInput | PersonnelWhereInput[]
    firstName?: StringFilter<"Personnel"> | string
    lastName?: StringFilter<"Personnel"> | string
    mobile?: StringNullableFilter<"Personnel"> | string | null
    function?: StringNullableFilter<"Personnel"> | string | null
    endOfContract?: StringNullableFilter<"Personnel"> | string | null
    k?: IntFilter<"Personnel"> | number
    b?: StringNullableFilter<"Personnel"> | string | null
    next?: DateTimeNullableFilter<"Personnel"> | Date | string | null
    outOfService?: BoolFilter<"Personnel"> | boolean
    createdAt?: DateTimeFilter<"Personnel"> | Date | string
    updatedAt?: DateTimeFilter<"Personnel"> | Date | string
  }, "id">

  export type PersonnelOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    mobile?: SortOrderInput | SortOrder
    function?: SortOrderInput | SortOrder
    endOfContract?: SortOrderInput | SortOrder
    k?: SortOrder
    b?: SortOrderInput | SortOrder
    next?: SortOrderInput | SortOrder
    outOfService?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PersonnelCountOrderByAggregateInput
    _avg?: PersonnelAvgOrderByAggregateInput
    _max?: PersonnelMaxOrderByAggregateInput
    _min?: PersonnelMinOrderByAggregateInput
    _sum?: PersonnelSumOrderByAggregateInput
  }

  export type PersonnelScalarWhereWithAggregatesInput = {
    AND?: PersonnelScalarWhereWithAggregatesInput | PersonnelScalarWhereWithAggregatesInput[]
    OR?: PersonnelScalarWhereWithAggregatesInput[]
    NOT?: PersonnelScalarWhereWithAggregatesInput | PersonnelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Personnel"> | string
    firstName?: StringWithAggregatesFilter<"Personnel"> | string
    lastName?: StringWithAggregatesFilter<"Personnel"> | string
    mobile?: StringNullableWithAggregatesFilter<"Personnel"> | string | null
    function?: StringNullableWithAggregatesFilter<"Personnel"> | string | null
    endOfContract?: StringNullableWithAggregatesFilter<"Personnel"> | string | null
    k?: IntWithAggregatesFilter<"Personnel"> | number
    b?: StringNullableWithAggregatesFilter<"Personnel"> | string | null
    next?: DateTimeNullableWithAggregatesFilter<"Personnel"> | Date | string | null
    outOfService?: BoolWithAggregatesFilter<"Personnel"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Personnel"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Personnel"> | Date | string
  }

  export type WorkEquipmentWhereInput = {
    AND?: WorkEquipmentWhereInput | WorkEquipmentWhereInput[]
    OR?: WorkEquipmentWhereInput[]
    NOT?: WorkEquipmentWhereInput | WorkEquipmentWhereInput[]
    id?: StringFilter<"WorkEquipment"> | string
    type?: StringFilter<"WorkEquipment"> | string
    description?: StringFilter<"WorkEquipment"> | string
    identification?: StringNullableFilter<"WorkEquipment"> | string | null
    operatingCompany?: StringNullableFilter<"WorkEquipment"> | string | null
    next?: DateTimeNullableFilter<"WorkEquipment"> | Date | string | null
    d?: StringNullableFilter<"WorkEquipment"> | string | null
    removed?: BoolFilter<"WorkEquipment"> | boolean
    createdAt?: DateTimeFilter<"WorkEquipment"> | Date | string
    updatedAt?: DateTimeFilter<"WorkEquipment"> | Date | string
  }

  export type WorkEquipmentOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    description?: SortOrder
    identification?: SortOrderInput | SortOrder
    operatingCompany?: SortOrderInput | SortOrder
    next?: SortOrderInput | SortOrder
    d?: SortOrderInput | SortOrder
    removed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkEquipmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkEquipmentWhereInput | WorkEquipmentWhereInput[]
    OR?: WorkEquipmentWhereInput[]
    NOT?: WorkEquipmentWhereInput | WorkEquipmentWhereInput[]
    type?: StringFilter<"WorkEquipment"> | string
    description?: StringFilter<"WorkEquipment"> | string
    identification?: StringNullableFilter<"WorkEquipment"> | string | null
    operatingCompany?: StringNullableFilter<"WorkEquipment"> | string | null
    next?: DateTimeNullableFilter<"WorkEquipment"> | Date | string | null
    d?: StringNullableFilter<"WorkEquipment"> | string | null
    removed?: BoolFilter<"WorkEquipment"> | boolean
    createdAt?: DateTimeFilter<"WorkEquipment"> | Date | string
    updatedAt?: DateTimeFilter<"WorkEquipment"> | Date | string
  }, "id">

  export type WorkEquipmentOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    description?: SortOrder
    identification?: SortOrderInput | SortOrder
    operatingCompany?: SortOrderInput | SortOrder
    next?: SortOrderInput | SortOrder
    d?: SortOrderInput | SortOrder
    removed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WorkEquipmentCountOrderByAggregateInput
    _max?: WorkEquipmentMaxOrderByAggregateInput
    _min?: WorkEquipmentMinOrderByAggregateInput
  }

  export type WorkEquipmentScalarWhereWithAggregatesInput = {
    AND?: WorkEquipmentScalarWhereWithAggregatesInput | WorkEquipmentScalarWhereWithAggregatesInput[]
    OR?: WorkEquipmentScalarWhereWithAggregatesInput[]
    NOT?: WorkEquipmentScalarWhereWithAggregatesInput | WorkEquipmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkEquipment"> | string
    type?: StringWithAggregatesFilter<"WorkEquipment"> | string
    description?: StringWithAggregatesFilter<"WorkEquipment"> | string
    identification?: StringNullableWithAggregatesFilter<"WorkEquipment"> | string | null
    operatingCompany?: StringNullableWithAggregatesFilter<"WorkEquipment"> | string | null
    next?: DateTimeNullableWithAggregatesFilter<"WorkEquipment"> | Date | string | null
    d?: StringNullableWithAggregatesFilter<"WorkEquipment"> | string | null
    removed?: BoolWithAggregatesFilter<"WorkEquipment"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"WorkEquipment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WorkEquipment"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkPlanCreateInput = {
    id?: string
    start: Date | string
    end: Date | string
    title: string
    number: string
    location: string
    address: string
    type: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkPlanUncheckedCreateInput = {
    id?: string
    start: Date | string
    end: Date | string
    title: string
    number: string
    location: string
    address: string
    type: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkPlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkPlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkPlanCreateManyInput = {
    id?: string
    start: Date | string
    end: Date | string
    title: string
    number: string
    location: string
    address: string
    type: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkPlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkPlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkplaceInspectionCreateInput = {
    id?: string
    date: Date | string
    title: string
    number: string
    type: string
    inspector: string
    location: string
    deviations?: string | null
    direct?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkplaceInspectionUncheckedCreateInput = {
    id?: string
    date: Date | string
    title: string
    number: string
    type: string
    inspector: string
    location: string
    deviations?: string | null
    direct?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkplaceInspectionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    inspector?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    deviations?: NullableStringFieldUpdateOperationsInput | string | null
    direct?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkplaceInspectionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    inspector?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    deviations?: NullableStringFieldUpdateOperationsInput | string | null
    direct?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkplaceInspectionCreateManyInput = {
    id?: string
    date: Date | string
    title: string
    number: string
    type: string
    inspector: string
    location: string
    deviations?: string | null
    direct?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkplaceInspectionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    inspector?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    deviations?: NullableStringFieldUpdateOperationsInput | string | null
    direct?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkplaceInspectionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    inspector?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    deviations?: NullableStringFieldUpdateOperationsInput | string | null
    direct?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    date: Date | string
    planned?: Date | string | null
    reference?: string | null
    type: string
    description: string
    by: string
    status: string
    owner?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    date: Date | string
    planned?: Date | string | null
    reference?: string | null
    type: string
    description: string
    by: string
    status: string
    owner?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    planned?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    by?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    planned?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    by?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    date: Date | string
    planned?: Date | string | null
    reference?: string | null
    type: string
    description: string
    by: string
    status: string
    owner?: string | null
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    planned?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    by?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    planned?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    by?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonnelCreateInput = {
    id?: string
    firstName: string
    lastName: string
    mobile?: string | null
    function?: string | null
    endOfContract?: string | null
    k?: number
    b?: string | null
    next?: Date | string | null
    outOfService?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PersonnelUncheckedCreateInput = {
    id?: string
    firstName: string
    lastName: string
    mobile?: string | null
    function?: string | null
    endOfContract?: string | null
    k?: number
    b?: string | null
    next?: Date | string | null
    outOfService?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PersonnelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    function?: NullableStringFieldUpdateOperationsInput | string | null
    endOfContract?: NullableStringFieldUpdateOperationsInput | string | null
    k?: IntFieldUpdateOperationsInput | number
    b?: NullableStringFieldUpdateOperationsInput | string | null
    next?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    outOfService?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonnelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    function?: NullableStringFieldUpdateOperationsInput | string | null
    endOfContract?: NullableStringFieldUpdateOperationsInput | string | null
    k?: IntFieldUpdateOperationsInput | number
    b?: NullableStringFieldUpdateOperationsInput | string | null
    next?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    outOfService?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonnelCreateManyInput = {
    id?: string
    firstName: string
    lastName: string
    mobile?: string | null
    function?: string | null
    endOfContract?: string | null
    k?: number
    b?: string | null
    next?: Date | string | null
    outOfService?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PersonnelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    function?: NullableStringFieldUpdateOperationsInput | string | null
    endOfContract?: NullableStringFieldUpdateOperationsInput | string | null
    k?: IntFieldUpdateOperationsInput | number
    b?: NullableStringFieldUpdateOperationsInput | string | null
    next?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    outOfService?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonnelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    mobile?: NullableStringFieldUpdateOperationsInput | string | null
    function?: NullableStringFieldUpdateOperationsInput | string | null
    endOfContract?: NullableStringFieldUpdateOperationsInput | string | null
    k?: IntFieldUpdateOperationsInput | number
    b?: NullableStringFieldUpdateOperationsInput | string | null
    next?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    outOfService?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkEquipmentCreateInput = {
    id?: string
    type: string
    description: string
    identification?: string | null
    operatingCompany?: string | null
    next?: Date | string | null
    d?: string | null
    removed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkEquipmentUncheckedCreateInput = {
    id?: string
    type: string
    description: string
    identification?: string | null
    operatingCompany?: string | null
    next?: Date | string | null
    d?: string | null
    removed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkEquipmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    identification?: NullableStringFieldUpdateOperationsInput | string | null
    operatingCompany?: NullableStringFieldUpdateOperationsInput | string | null
    next?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    d?: NullableStringFieldUpdateOperationsInput | string | null
    removed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkEquipmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    identification?: NullableStringFieldUpdateOperationsInput | string | null
    operatingCompany?: NullableStringFieldUpdateOperationsInput | string | null
    next?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    d?: NullableStringFieldUpdateOperationsInput | string | null
    removed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkEquipmentCreateManyInput = {
    id?: string
    type: string
    description: string
    identification?: string | null
    operatingCompany?: string | null
    next?: Date | string | null
    d?: string | null
    removed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkEquipmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    identification?: NullableStringFieldUpdateOperationsInput | string | null
    operatingCompany?: NullableStringFieldUpdateOperationsInput | string | null
    next?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    d?: NullableStringFieldUpdateOperationsInput | string | null
    removed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkEquipmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    identification?: NullableStringFieldUpdateOperationsInput | string | null
    operatingCompany?: NullableStringFieldUpdateOperationsInput | string | null
    next?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    d?: NullableStringFieldUpdateOperationsInput | string | null
    removed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type WorkPlanCountOrderByAggregateInput = {
    id?: SortOrder
    start?: SortOrder
    end?: SortOrder
    title?: SortOrder
    number?: SortOrder
    location?: SortOrder
    address?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkPlanMaxOrderByAggregateInput = {
    id?: SortOrder
    start?: SortOrder
    end?: SortOrder
    title?: SortOrder
    number?: SortOrder
    location?: SortOrder
    address?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkPlanMinOrderByAggregateInput = {
    id?: SortOrder
    start?: SortOrder
    end?: SortOrder
    title?: SortOrder
    number?: SortOrder
    location?: SortOrder
    address?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type WorkplaceInspectionCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    title?: SortOrder
    number?: SortOrder
    type?: SortOrder
    inspector?: SortOrder
    location?: SortOrder
    deviations?: SortOrder
    direct?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkplaceInspectionMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    title?: SortOrder
    number?: SortOrder
    type?: SortOrder
    inspector?: SortOrder
    location?: SortOrder
    deviations?: SortOrder
    direct?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkplaceInspectionMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    title?: SortOrder
    number?: SortOrder
    type?: SortOrder
    inspector?: SortOrder
    location?: SortOrder
    deviations?: SortOrder
    direct?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    planned?: SortOrder
    reference?: SortOrder
    type?: SortOrder
    description?: SortOrder
    by?: SortOrder
    status?: SortOrder
    owner?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    planned?: SortOrder
    reference?: SortOrder
    type?: SortOrder
    description?: SortOrder
    by?: SortOrder
    status?: SortOrder
    owner?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    planned?: SortOrder
    reference?: SortOrder
    type?: SortOrder
    description?: SortOrder
    by?: SortOrder
    status?: SortOrder
    owner?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type PersonnelCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    mobile?: SortOrder
    function?: SortOrder
    endOfContract?: SortOrder
    k?: SortOrder
    b?: SortOrder
    next?: SortOrder
    outOfService?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PersonnelAvgOrderByAggregateInput = {
    k?: SortOrder
  }

  export type PersonnelMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    mobile?: SortOrder
    function?: SortOrder
    endOfContract?: SortOrder
    k?: SortOrder
    b?: SortOrder
    next?: SortOrder
    outOfService?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PersonnelMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    mobile?: SortOrder
    function?: SortOrder
    endOfContract?: SortOrder
    k?: SortOrder
    b?: SortOrder
    next?: SortOrder
    outOfService?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PersonnelSumOrderByAggregateInput = {
    k?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type WorkEquipmentCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    description?: SortOrder
    identification?: SortOrder
    operatingCompany?: SortOrder
    next?: SortOrder
    d?: SortOrder
    removed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkEquipmentMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    description?: SortOrder
    identification?: SortOrder
    operatingCompany?: SortOrder
    next?: SortOrder
    d?: SortOrder
    removed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkEquipmentMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    description?: SortOrder
    identification?: SortOrder
    operatingCompany?: SortOrder
    next?: SortOrder
    d?: SortOrder
    removed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}