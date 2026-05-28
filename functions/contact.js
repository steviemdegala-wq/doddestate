export async function onRequestPost(context) {
  const { request, env } = context;

  const formData = await request.formData();
  const firstName = formData.get('first_name') || '';
  const lastName  = formData.get('last_name')  || '';
  const email     = formData.get('email')       || '';
  const subject   = formData.get('subject')     || '(no subject)';
  const message   = formData.get('message')     || '(no message)';

  const body = [
    `New inquiry — The Dodd Estate`,
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    `Message: ${message}`,
  ].join('\n');

  const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`;

  const res = await fetch(twilioUrl, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      From: env.TWILIO_FROM_NUMBER,
      To:   env.TWILIO_TO_NUMBER,
      Body: body,
    }),
  });

  const redirectBase = new URL(request.url).origin;

  if (res.ok) {
    return Response.redirect(`${redirectBase}/?sent=1`, 303);
  } else {
    const err = await res.text();
    console.error('Twilio error:', err);
    return Response.redirect(`${redirectBase}/?sent=error`, 303);
  }
}
