
import Mailgun from 'mailgun-js';

/**
 * Email service provider class
 */
export default class Email {

    protected _subject: string;
    protected _body: string;
    protected _to: string | string[];
    protected _cc: string | string[];
    protected _bcc: string | string[];
    protected _from: string;
    protected _replyTo: string;

    public constructor() {
        this._cc = [];
        this._bcc = [];
        this._to = [];
        this._replyTo = this._from = process.env.REPLY_TO_EMAIL;
    }

    /**
     * set the to email
     * @param to to email
     */
    public to(to: any) : Email {
        this._to = to;
        return this;
    }

    /**
     * set from
     * @param from set from
     */
    public from(from: string) : Email {
        this._replyTo = this._from = from;
        return this;
    }

    /**
     * 
     * @param subject set the subject
     */
    public subject(subject: string) : Email {
        this._subject = subject;
        return this
    }

    /**
     * set the bcc email
     * @param bcc bcc email
     */
    public bcc(bcc: any) : Email  {
        this._bcc = bcc;
        return this;
    }

    /**
     * set the body.
     * @param body body of the email.
     */
    public body(body: string) : Email {
        this._body = body;
        return this
    }

    /**
     * Send email.
     */
    public async send(): Promise<Mailgun.messages.SendResponse> {
        let api_key = process.env.MAILGUN_API_KEY
        let domain = process.env.MAILGUN_DOMAIN;
        let mailgun = Mailgun({ apiKey: api_key, domain: domain });

        var data = {
            from: this._from,
            to: this._to,
            subject: this._subject,
            text: this._body
        };
        return await mailgun.messages().send(data);

    }
}