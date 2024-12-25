/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Event {
  /** ID */
  id?: number;
  /** Owner */
  owner?: string;
  /** Moderator */
  moderator?: string;
  /** Tickets */
  tickets?: string;
  /** Статус */
  status?: 1 | 2 | 3 | 4 | 5;
  /**
   * Дата создания
   * @format date-time
   */
  date_created?: string | null;
  /**
   * Дата формирования
   * @format date-time
   */
  date_formation?: string | null;
  /**
   * Дата завершения
   * @format date-time
   */
  date_complete?: string | null;
  /** Field */
  field?: string | null;
  /**
   * Phone
   * @min -2147483648
   * @max 2147483647
   */
  phone?: number | null;
}

export interface TicketEvent {
  /** ID */
  id?: number;
  /**
   * Count
   * @min -2147483648
   * @max 2147483647
   */
  count?: number;
  /** Ticket */
  ticket?: number | null;
  /** Event */
  event?: number | null;
}

export interface UpdateEventStatusAdmin {
  /** Status */
  status: number;
}

export interface TicketAdd {
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Описание
   * @minLength 1
   * @maxLength 500
   */
  description: string;
  /**
   * Дата
   * @min -2147483648
   * @max 2147483647
   */
  date: number;
  /**
   * Фото
   * @format uri
   */
  image?: string | null;
}

export interface Ticket {
  /** ID */
  id?: number;
  /** Image */
  image?: string;
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Описание
   * @minLength 1
   * @maxLength 500
   */
  description: string;
  /** Статус */
  status?: 1 | 2;
  /**
   * Дата
   * @min -2147483648
   * @max 2147483647
   */
  date: number;
}

export interface UserLogin {
  /**
   * Username
   * @minLength 1
   */
  username: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface UserRegister {
  /** ID */
  id?: number;
  /**
   * Адрес электронной почты
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
}

export interface UserProfile {
  /**
   * Username
   * @minLength 1
   */
  username?: string;
  /**
   * Email
   * @minLength 1
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   */
  password?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000/api" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000/api
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  events = {
    /**
     * No description
     *
     * @tags events
     * @name EventsList
     * @request GET:/events/
     * @secure
     */
    eventsList: (
      query?: {
        status?: number;
        date_formation_start?: string;
        date_formation_end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/events/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventsRead
     * @request GET:/events/{event_id}/
     * @secure
     */
    eventsRead: (eventId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/events/${eventId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventsDeleteDelete
     * @request DELETE:/events/{event_id}/delete/
     * @secure
     */
    eventsDeleteDelete: (eventId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/events/${eventId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventsDeleteTicketDelete
     * @request DELETE:/events/{event_id}/delete_ticket/{ticket_id}/
     * @secure
     */
    eventsDeleteTicketDelete: (eventId: string, ticketId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/events/${eventId}/delete_ticket/${ticketId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventsUpdateUpdate
     * @request PUT:/events/{event_id}/update/
     * @secure
     */
    eventsUpdateUpdate: (eventId: string, data: Event, params: RequestParams = {}) =>
      this.request<Event, any>({
        path: `/events/${eventId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventsUpdateTicketUpdate
     * @request PUT:/events/{event_id}/update_ticket/{ticket_id}/
     * @secure
     */
    eventsUpdateTicketUpdate: (
      eventId: string,
      ticketId: string,
      data: TicketEvent,
      params: RequestParams = {},
    ) =>
      this.request<TicketEvent, any>({
        path: `/events/${eventId}/update_ticket/${ticketId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventsUpdateStatusAdminUpdate
     * @request PUT:/events/{event_id}/update_status_admin/
     * @secure
     */
    eventsUpdateStatusAdminUpdate: (
      eventId: string,
      data: UpdateEventStatusAdmin,
      params: RequestParams = {},
    ) =>
      this.request<UpdateEventStatusAdmin, any>({
        path: `/events/${eventId}/update_status_admin/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags events
     * @name EventsUpdateStatusUserUpdate
     * @request PUT:/events/{event_id}/update_status_user/
     * @secure
     */
    eventsUpdateStatusUserUpdate: (eventId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/events/${eventId}/update_status_user/`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  tickets = {
    /**
     * No description
     *
     * @tags tickets
     * @name TicketsList
     * @request GET:/tickets/
     * @secure
     */
    ticketsList: (
      query?: {
        ticket_name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/tickets/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags tickets
     * @name TicketsCreateCreate
     * @request POST:/tickets/create/
     * @secure
     */
    ticketsCreateCreate: (
      data: {
        /**
         * @minLength 1
         * @maxLength 100
         */
        name: string;
        /**
         * @minLength 1
         * @maxLength 500
         */
        description: string;
        /**
         * @min -2147483648
         * @max 2147483647
         */
        date: number;
        /** @format binary */
        image?: File | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<TicketAdd, any>({
        path: `/tickets/create/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags tickets
     * @name TicketsRead
     * @request GET:/tickets/{ticket_id}/
     * @secure
     */
    ticketsRead: (ticketId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/tickets/${ticketId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags tickets
     * @name TicketsAddToEventCreate
     * @request POST:/tickets/{ticket_id}/add_to_event/
     * @secure
     */
    ticketsAddToEventCreate: (ticketId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/tickets/${ticketId}/add_to_event/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags tickets
     * @name TicketsDeleteDelete
     * @request DELETE:/tickets/{ticket_id}/delete/
     * @secure
     */
    ticketsDeleteDelete: (ticketId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/tickets/${ticketId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags tickets
     * @name TicketsUpdateUpdate
     * @request PUT:/tickets/{ticket_id}/update/
     * @secure
     */
    ticketsUpdateUpdate: (ticketId: string, data: Ticket, params: RequestParams = {}) =>
      this.request<Ticket, any>({
        path: `/tickets/${ticketId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags tickets
     * @name TicketsUpdateImageCreate
     * @request POST:/tickets/{ticket_id}/update_image/
     * @secure
     */
    ticketsUpdateImageCreate: (
      ticketId: string,
      data: {
        /** @format binary */
        image?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/tickets/${ticketId}/update_image/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersLoginCreate
     * @request POST:/users/login/
     * @secure
     */
    usersLoginCreate: (data: UserLogin, params: RequestParams = {}) =>
      this.request<UserLogin, any>({
        path: `/users/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersLogoutCreate
     * @request POST:/users/logout/
     * @secure
     */
    usersLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegisterCreate
     * @request POST:/users/register/
     * @secure
     */
    usersRegisterCreate: (data: UserRegister, params: RequestParams = {}) =>
      this.request<UserRegister, any>({
        path: `/users/register/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdateUpdate
     * @request PUT:/users/{user_id}/update/
     * @secure
     */
    usersUpdateUpdate: (userId: string, data: UserProfile, params: RequestParams = {}) =>
      this.request<UserProfile, any>({
        path: `/users/${userId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
