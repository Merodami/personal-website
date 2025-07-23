export async function onRequest(context: {
  request: Request & { cf?: { country?: string } };
  next: () => Promise<Response>;
}) {
  const { request, next } = context;
  const url = new URL(request.url);
  const country = request.cf?.country || '';

  // Only intercept requests to the root of your site
  if (url.pathname === '/') {
    const spanishSpeakingCountries = [
      'AR', // Argentina
      'BO', // Bolivia
      'CL', // Chile
      'CO', // Colombia
      'CR', // Costa Rica
      'CU', // Cuba
      'DO', // Dominican Republic
      'EC', // Ecuador
      'SV', // El Salvador
      'GQ', // Equatorial Guinea
      'GT', // Guatemala
      'HN', // Honduras
      'MX', // Mexico
      'NI', // Nicaragua
      'PA', // Panama
      'PY', // Paraguay
      'PE', // Peru
      'ES', // Spain
      'UY', // Uruguay
      'VE', // Venezuela
      'PR', // Puerto Rico (U.S. territory with Spanish as co-official)
    ];

    if (!spanishSpeakingCountries.includes(country)) {
      return Response.redirect(`${url.origin}/en`, 302);
    }
  }

  // Otherwise just continue to the next handler (static asset or page)
  return next();
}
