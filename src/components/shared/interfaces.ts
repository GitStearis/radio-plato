export enum Socials {
    Castbox = "castbox",
    Itunes = "itunes",
    Mixcloud = "mixcloud",
    Spotify = "spotify",
    Facebook = "facebook",
    Vk = "vk",
    Email = "email",
    Instagram = "instagram",
    Telegram = "telegram",
    GooglePlay = "googlePlay",
    GooglePodcasts = "googlepodcasts",
    Patreon = "patreon",
    Soundcloud = "soundcloud",
}

export enum Locale {
    English = "en",
    Belorussian = "be-BY",
    Russian = "ru-RU",
}

export enum LocaleString {
    English = "EN",
    Belorussian = "BY",
    Russian = "RU",
}

export type SocialLinks = {
    [key in Socials]?: string;
};

export interface StrapiObjectDto {
    createdAt: string;
    id: string;
    updatedAt: string;
    __v: number;
    _id: number;
}

export interface StrapiLocalization {
    _id: string;
    id: string;
    locale: Locale;
    published_at: string;
}

export interface ImageDto {
    ext: string;
    hash: string;
    height: number;
    mime: string;
    size: number;
    url: string;
    width: number;
}

export interface FormatsDto {
    thumbnail?: ImageDto;
}

export interface CoverDto extends StrapiObjectDto, ImageDto {
    alternativeText: string;
    caption: string;
    formats: FormatsDto;
    name: string;
    provider: string;
    related: string[];
}

export interface SimpleImage {
    alternativeText?: string;
    caption?: string;
    url?: string;
}
