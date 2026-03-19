interface ForgotPasswordEmailProps {
  userName: string;
  resetLink: string;
}

export function forgotPasswordEmailTemplate({
  userName,
  resetLink,
}: ForgotPasswordEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Redefinição de Senha</title>
  </head>

  <body style="margin:0; padding:0; background-color:#e0f2fe; font-family:Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 40px 16px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff; border-radius:16px; overflow:hidden;">
            <tr>
              <td style="padding:48px 32px; background-color:#93c5fd; text-align:center;">
                <h1 style="margin:0 0 12px; color:#1e3a8a; font-size:28px; font-weight:bold;">Redefinição de Senha</h1>
                <p style="margin:0; color:#1e40af; font-size:16px;">Vamos redefinir sua senha com segurança</p>
              </td>
            </tr>

            <tr>
              <td style="padding:32px;">
                <p style="font-size:16px; color:#1e3a8a; margin:0 0 16px;">Olá <strong>${userName}</strong>,</p>
                <p style="font-size:15px; color:#334155; margin:0 0 24px; line-height:1.6;">
                  Recebemos uma solicitação para redefinir a senha da sua conta. Para continuar, clique no botão abaixo.
                </p>

                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="padding:24px 0;">
                      <a href="${resetLink}" style="background-color:#60a5fa; color:#ffffff; text-decoration:none; padding:16px 32px; border-radius:12px; font-size:16px; font-weight:bold; display:inline-block;">
                        Redefinir Senha
                      </a>
                    </td>
                  </tr>
                </table>

                <div style="background-color:#f0f9ff; border:1px solid #bae6fd; border-radius:12px; padding:16px; margin:24px 0;">
                  <p style="margin:0 0 8px; font-size:13px; color:#1e40af;">Ou copie e cole este link no seu navegador:</p>
                  <p style="margin:0; font-size:12px; color:#2563eb; word-break:break-all;">${resetLink}</p>
                </div>

                <div style="background-color:#e0f2fe; border-left:4px solid #60a5fa; padding:12px 16px; border-radius:8px;">
                  <p style="margin:0 0 4px; font-size:13px; color:#1e40af; font-weight:bold;">⏰ Este link expira em 1 hora</p>
                  <p style="margin:0; font-size:13px; color:#1e40af; line-height:1.5;">Se você não solicitou a redefinição de senha, ignore este e-mail. Sua conta continuará segura.</p>
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:16px; text-align:center; background-color:#f0f9ff; border-top:1px solid #bae6fd;">
                <p style="margin:0; font-size:12px; color:#1e40af;">Este é um e-mail automático, por favor não responda.</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}
