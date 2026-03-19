interface CollaboratorInviteEmailProps {
  collaboratorName: string;
  projectName: string;
  role: string;
  email: string;
  acceptInviteLink: string;
}

export function collaboratorInviteEmailTemplate({
  collaboratorName,
  projectName,
  role,
  email,
  acceptInviteLink,
}: CollaboratorInviteEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Convite para Colaborador</title>
  </head>

  <body style="margin:0; padding:0; background-color:#e0f2fe; font-family:Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 40px 16px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff; border-radius:16px; overflow:hidden;">
            <tr>
              <td style="padding:48px 32px; background-color:#93c5fd; text-align:center;">
                <h1 style="margin:0 0 12px; color:#1e3a8a; font-size:28px; font-weight:bold;">🎉 Você foi convidado!</h1>
                <p style="margin:0; color:#1e40af; font-size:16px;">Junte-se ao sistema ${projectName}</p>
              </td>
            </tr>

            <tr>
              <td style="padding:32px;">
                <p style="font-size:16px; color:#1e3a8a; margin:0 0 16px;">Olá <strong>${collaboratorName}</strong>,</p>
                <p style="font-size:15px; color:#334155; margin:0 0 24px; line-height:1.6;">
                  Você foi convidado para fazer parte da plataforma <strong>${projectName}</strong> no cargo de <strong>${role}</strong>!
                </p>

                <div style="background-color:#f0f9ff; border-radius:12px; padding:20px; margin:24px 0;">
                  <p style="margin:0 0 12px; font-size:14px; color:#1e40af; font-weight:bold;">📧 Seu e-mail de acesso:</p>
                  <p style="margin:0; font-size:15px; color:#1e3a8a; font-family:monospace;">${email}</p>
                </div>

                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="padding:24px 0;">
                      <a href="${acceptInviteLink}" style="background-color:#60a5fa; color:#ffffff; text-decoration:none; padding:16px 32px; border-radius:12px; font-size:16px; font-weight:bold; display:inline-block;">
                        Aceitar e Criar Senha
                      </a>
                    </td>
                  </tr>
                </table>

                <div style="background-color:#e0f2fe; border-left:4px solid #60a5fa; padding:12px 16px; border-radius:8px; margin-bottom:20px;">
                  <p style="margin:0 0 4px; font-size:13px; color:#1e40af; font-weight:bold;">⏰ Este convite expira em 72 horas</p>
                  <p style="margin:0; font-size:13px; color:#1e40af; line-height:1.5;">Clique no botão acima para ativar sua conta e criar sua senha de acesso!</p>
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

