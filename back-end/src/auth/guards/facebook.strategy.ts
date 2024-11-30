import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-facebook';

import { env } from 'process';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
      callbackURL: env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'name', 'emails', 'photos'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, photos, id } = profile;
    console.log(profile);
    const user = {
      email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
      facebookId: id,
      accessToken,
    };
    done(null, user);
  }
}