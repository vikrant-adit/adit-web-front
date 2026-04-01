import { resolveImageUrl } from '../../src/lib/imageResolver';

describe('resolveImageUrl', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...ORIGINAL_ENV };
    delete process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL_FOR_IMAGES;
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  test('should return empty string when input is undefined', () => {
    expect(resolveImageUrl(undefined)).toBe('');
  });

  test('should return empty string when object input has no url or empty url', () => {
    expect(resolveImageUrl({})).toBe('');
    expect(resolveImageUrl({ url: '' })).toBe('');
  });

  test('should return same absolute URL for http/https input', () => {
    expect(resolveImageUrl('https://example.com/img.png')).toBe('https://example.com/img.png');
    expect(resolveImageUrl('http://example.com/img.png')).toBe('http://example.com/img.png');
  });

  test('should return same protocol-relative URL starting with //', () => {
    expect(resolveImageUrl('//cdn.example.com/img.png')).toBe('//cdn.example.com/img.png');
  });

  test('should prefix root-relative path with env base when defined', () => {
    process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL_FOR_IMAGES = 'https://assets.example.com';
    expect(resolveImageUrl('/uploads/img.png')).toBe('https://assets.example.com/uploads/img.png');
  });

  test('should not prefix root-relative path when env base is empty', () => {
    process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL_FOR_IMAGES = '';
    expect(resolveImageUrl('/uploads/img.png')).toBe('/uploads/img.png');
    delete process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL_FOR_IMAGES;
    expect(resolveImageUrl('/uploads/img.png')).toBe('/uploads/img.png');
  });

  test('should prefix non-root relative path when env base is defined', () => {
    process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL_FOR_IMAGES = 'https://assets.example.com';
    expect(resolveImageUrl('uploads/img.png')).toBe('https://assets.example.com/uploads/img.png');
  });

  test('should not prefix non-root relative path when env base is empty', () => {
    process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL_FOR_IMAGES = '';
    expect(resolveImageUrl('uploads/img.png')).toBe('uploads/img.png');
    delete process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL_FOR_IMAGES;
    expect(resolveImageUrl('uploads/img.png')).toBe('uploads/img.png');
  });

  test('should trim trailing slash from env base (root-relative input)', () => {
    process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL_FOR_IMAGES = 'https://assets.example.com/';
    expect(resolveImageUrl('/uploads/img.png')).toBe('https://assets.example.com/uploads/img.png');
  });

  test('should handle object input with url field', () => {
    process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL_FOR_IMAGES = 'https://assets.example.com';
    expect(resolveImageUrl({ url: '/uploads/img.png' })).toBe('https://assets.example.com/uploads/img.png');
  });

  // New behaviors
  test('should return same absolute URL for object input with uppercase scheme (case-insensitive match)', () => {
    expect(resolveImageUrl({ url: 'HTTP://EXAMPLE.COM/img.png' })).toBe('HTTP://EXAMPLE.COM/img.png');
    expect(resolveImageUrl({ url: 'HTTPS://EXAMPLE.COM/img.png' })).toBe('HTTPS://EXAMPLE.COM/img.png');
  });

  test('should prefix dot-prefixed relative paths (./ and ../) when env base is defined', () => {
    process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL_FOR_IMAGES = 'https://assets.example.com';
    expect(resolveImageUrl('./uploads/img.png')).toBe('https://assets.example.com/./uploads/img.png');
    expect(resolveImageUrl('../img.png')).toBe('https://assets.example.com/../img.png');
  });

  test('should avoid double slashes when base ends with slash and path is non-root relative', () => {
    process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL_FOR_IMAGES = 'https://assets.example.com/';
    expect(resolveImageUrl('uploads/img.png')).toBe('https://assets.example.com/uploads/img.png');
  });

  test('should preserve query string and hash when prefixing paths', () => {
    process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL_FOR_IMAGES = 'https://assets.example.com';
    expect(resolveImageUrl('/uploads/img.png?v=1#x')).toBe('https://assets.example.com/uploads/img.png?v=1#x');
    expect(resolveImageUrl('uploads/img.png?cache=bust#hash')).toBe('https://assets.example.com/uploads/img.png?cache=bust#hash');
  });

  test('should return protocol-relative URL unchanged when provided as object input', () => {
    expect(resolveImageUrl({ url: '//cdn.example.com/img.png' })).toBe('//cdn.example.com/img.png');
  });
});
