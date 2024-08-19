export const submitOpportunity = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Giverr</title>    
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: Arial;
            box-sizing: border-box;
            font-size: 16px;
            color: #000;
            line-height: 24px;
        }
        a {
            text-decoration: none;
        }
        table {
            border-spacing: 0;
        }
    </style>
</head>

<body text="#000000" bgcolor="#E60054">
    <center style="padding: 0 10px; background-color: #E60054;" bgcolor="#E60054">
        <table>
            <tbody>
                <tr><td height="32"></td></tr>
            </tbody>
        </table>
        <table style="border-radius: 16px; max-width: 100%; width: 660px; text-align: center; box-shadow: 0px 3px 9px rgba(181, 189, 198, 0.14); -moz-box-shadow: 0px 3px 9px rgba(181, 189, 198, 0.14); -webkit-box-shadow: 0px 3px 9px rgba(181, 189, 198, 0.14);" width="660px" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff">
            <tbody>
                <tr>
                    <td width="64"></td>
                    <td>
                        <table width="100%" cellspacing="0" cellpadding="0" border="0" align="left">
                            <tbody>
                                <tr><td height="64"></td></tr>
                                <tr>
                                    <td>
                                        <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                            <tbody>
                                                <tr> 
                                                    <td align="center">
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td><a href="#"><img src={{templateLogo}}></a></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td> 
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                
                                <tr><td height="64"></td></tr>
                                
                                <tr>
                                    <td>
                                        <table width="100%" style="font-size: 16px; line-height: 24px; color: #000;">
                                            <tbody>
                                                <tr> 
                                                    <td align="left">
                                                        Dear {{name}},
                                                    </td> 
                                                </tr>
                                                <tr><td height="20"></td></tr>
                                                <tr> 
                                                    <td align="left">
                                                        Thank you for submitting your event to Giverr! We have received your submission and are currently reviewing the details. You will be notified of our decision within 1 week.
                                                    </td> 
                                                </tr>
                                                <tr><td height="20"></td></tr>
                                                <tr> 
                                                    <td align="left">
                                                        If you have any questions in the meantime, feel free to contact us at {{supportEmail}}. 
                                                    </td> 
                                                </tr>
                                                <tr><td height="20"></td></tr>
                                                <tr> 
                                                    <td align="left">
                                                        Best regards,  
                                                    </td> 
                                                </tr>
                                                <tr> 
                                                    <td align="left"> 
                                                        The Giverr Team
                                                    </td> 
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                
                                <tr><td height="64"></td></tr>
                                
                                <tr>
                                    <td>
                                        <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                            <tbody>
                                                <tr> 
                                                    <td align="center">
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td><img style="width: 100%;" src={{ilustration}}></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td> 
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                
                                <tr><td height="64"></td></tr>
                                
                                <tr><td height="1" bgcolor="#E60054" style="opacity:0.10"></td></tr>
                                
                                <tr><td height="32"></td></tr>
                                
                                <tr>
                                    <td>
                                        <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                            <tbody>
                                                <tr> 
                                                    <td align="center">
                                                        <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="center"><a href="#"><img height="24" src={{templateLogo}}></a></td>
                                                                </tr>
                                                                <tr><td height="16"></td></tr>
                                                                <tr>
                                                                    <td align="center" style="font-size: 14px; color:#E60054; opacity:0.5;">Empowering the world to volunteer</td>
                                                                </tr>
                                                                <tr><td height="48"></td></tr>
                                                                <tr>
                                                                    <td>
                                                                        <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                                                            <tbody>
                                                                                <tr> 
                                                                                    <td align="center">
                                                                                        <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="center"><a target="_blank" href={{privacyPolicy}} style="font-size: 14px; color:#E60054; text-decoration: none;">Privacy Policy</a></td>
                                                                                                </tr>
                                                                                                <tr><td height="6"></td></tr>
                                                                                                <tr>
                                                                                                    <td align="center"><a target="_blank" href={{termsCondition}} style="font-size: 14px; color:#E60054; text-decoration: none;">Terms & Conditions</a></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td> 
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr><td height="24"></td></tr>
                                                                <tr>
                                                                    <td align="center">
                                                                        <table width="112" cellspacing="0" cellpadding="0" border="0">
                                                                            <tbody>
                                                                                <tr> 
                                                                                    <td align="center">
                                                                                        <a href="#"><img src={{linkdin}}></a>
                                                                                    </td> 
                                                                                    <td align="center">
                                                                                        <a href="#"><img src={{xImage}}></a>
                                                                                    </td> 
                                                                                    <td align="center">
                                                                                        <a href="#"><img src={{instagram}}></a>
                                                                                    </td> 
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr><td height="48"></td></tr>
                                                                <tr>
                                                                    <td align="center"><a href="#" style="font-size: 14px; color:#E60054; text-decoration: none;">Unsubscribe</a></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td> 
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr><td height="64"></td></tr>
                            </tbody>
                        </table>
                    </td>
                    <td width="64"></td>
                </tr>
            </tbody>
        </table>
        <table>
            <tbody>
                <tr><td height="32"></td></tr>
            </tbody>
        </table>
    </center>
</body>
</html>
`;
