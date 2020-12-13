describe('argon2.hash', function () {
    const { assert } = chai;

    const hash_data = it('should compute hash', async function () {
        const hash = await argon2.hash({
            pass: 'p@ssw0rd',
            salt: 'somesalt',
        });
        assert.ok(hash);
        assert.deepStrictEqual(
            hash.hash,
            /* prettier-ignore */
            new Uint8Array([36, 99, 163, 35, 223, 30, 71, 14, 26, 134, 8, 54,
                243, 110, 116, 23, 61, 129, 40, 65, 101, 227, 197, 230])
        );
        assert.strictEqual(
            hash.hashHex,
            '2463a323df1e470e1a860836f36e74173d81284165e3c5e6'
        );
        assert.strictEqual(
            hash.encoded,
            '$argon2d$v=19$m=1024,t=1,p=1$c29tZXNhbHQ$JGOjI98eRw4ahgg28250Fz2BKEFl48Xm'
        );
    });

    it('should be able to work several times', async function () {
        let hash = await argon2.hash({
            pass: 'p@ssw0rd',
            salt: 'somesalt',
        });
        assert.ok(hash);
        assert.strictEqual(
            hash.hashHex,
            '2463a323df1e470e1a860836f36e74173d81284165e3c5e6'
        );
        assert.strictEqual(
            hash.encoded,
            '$argon2d$v=19$m=1024,t=1,p=1$c29tZXNhbHQ$JGOjI98eRw4ahgg28250Fz2BKEFl48Xm'
        );

        hash = await argon2.hash({
            pass: 'p@ssw0rd2',
            salt: 'somesalt',
        });
        assert.ok(hash);
        assert.strictEqual(
            hash.hashHex,
            'f02360855fe22752362451bcd41206041304ce7908b5645b'
        );
        assert.strictEqual(
            hash.encoded,
            '$argon2d$v=19$m=1024,t=1,p=1$c29tZXNhbHQ$8CNghV/iJ1I2JFG81BIGBBMEznkItWRb'
        );
    });

    it('should compute hash for Argon2d', async function () {
        const hash = await argon2.hash({
            pass: 'p@ssw0rd',
            salt: 'somesalt',
            type: argon2.ArgonType.Argon2d,
        });
        assert.strictEqual(
            hash.encoded,
            '$argon2d$v=19$m=1024,t=1,p=1$c29tZXNhbHQ$JGOjI98eRw4ahgg28250Fz2BKEFl48Xm'
        );
    });

    it('should compute hash for Argon2i', async function () {
        const hash = await argon2.hash({
            pass: 'p@ssw0rd',
            salt: 'somesalt',
            type: argon2.ArgonType.Argon2i,
        });
        assert.strictEqual(
            hash.encoded,
            '$argon2i$v=19$m=1024,t=1,p=1$c29tZXNhbHQ$I4odzyBxoIvAnqjao5xt4/xS02zts+Jb'
        );
    });

    it('should compute hash for Argon2id', async function () {
        const hash = await argon2.hash({
            pass: 'p@ssw0rd',
            salt: 'somesalt',
            type: argon2.ArgonType.Argon2id,
        });
        assert.strictEqual(
            hash.encoded,
            '$argon2id$v=19$m=1024,t=1,p=1$c29tZXNhbHQ$dF4LZGqnznPWATUG/6m1Yp/Id1nKVSlk'
        );
    });

    it('should compute hash with different time complexity', async function () {
        const hash = await argon2.hash({
            pass: 'p@ssw0rd',
            salt: 'somesalt',
            time: 10,
        });
        assert.strictEqual(
            hash.encoded,
            '$argon2d$v=19$m=1024,t=10,p=1$c29tZXNhbHQ$uo6bzQ2Wjb9LhxGoSHnaMrIOAB/6dGAS'
        );
    });

    it('should compute hash with different memory complexity', async function () {
        const hash = await argon2.hash({
            pass: 'p@ssw0rd',
            salt: 'somesalt',
            mem: 2048,
        });
        assert.strictEqual(
            hash.encoded,
            '$argon2d$v=19$m=2048,t=1,p=1$c29tZXNhbHQ$6OXzaE6bdwMuoUqJt5U1TCrfJBF/8X3O'
        );
    });

    it('should compute hash with 1GB memory', async function () {
        this.timeout(30000);

        const hash = await argon2.hash({
            pass: 'p@ssw0rd',
            salt: 'somesalt',
            mem: 1024 * 1024,
        });
        assert.strictEqual(
            hash.encoded,
            '$argon2d$v=19$m=1048576,t=1,p=1$c29tZXNhbHQ$pqFpxcC+pJwEsSc8+YIkg5pnrNye8EDt'
        );
    });

    it('should compute hash with different length', async function () {
        const hash = await argon2.hash({
            pass: 'p@ssw0rd',
            salt: 'somesalt',
            hashLen: 32,
        });
        assert.strictEqual(
            hash.encoded,
            '$argon2d$v=19$m=1024,t=1,p=1$c29tZXNhbHQ$3w1C/UXK5b+K9eGlhctsuw1TivVU1JFCmB+DmM+MIiY'
        );
    });

    it('should compute hash with different parallelism', async function () {
        const hash = await argon2.hash({
            pass: 'p@ssw0rd',
            salt: 'somesalt',
            parallelism: 4,
        });
        assert.strictEqual(
            hash.encoded,
            '$argon2d$v=19$m=1024,t=1,p=4$c29tZXNhbHQ$0/nLmgLRIKqzzOET6/YYHgZrp0xJjACg'
        );
    });

    it('should compute hash of a string with unicode characters', async function () {
        const hash = await argon2.hash({
            pass: '汉字漢字',
            salt: 'asdfasdfasdfasdf',
            type: argon2.ArgonType.Argon2id,
            hashLen: 32,
        });
        assert.strictEqual(
            hash.encoded,
            '$argon2id$v=19$m=1024,t=1,p=1$YXNkZmFzZGZhc2RmYXNkZg$zzqgQLEjqikDwII1Qk2ZbyoCG12D25W7tXSgejiwiS0'
        );
    });

    it('should compute hash with additional data', async function () {
        const hash = await argon2.hash({
            pass: 'p@ssw0rd',
            salt: 'somesalt',
            ad: new Uint8Array([1, 2, 3]),
        });
        assert.strictEqual(
            hash.encoded,
            '$argon2d$v=19$m=1024,t=1,p=1$c29tZXNhbHQ$CuATwqimHlFHq0mTT0qnozY4kCjrGg7X'
        );
    });

    it('should compute hash with a secret', async function () {
        const hash = await argon2.hash({
            pass: 'p@ssw0rd',
            salt: 'somesalt',
            secret: new Uint8Array([1, 2, 3]),
        });
        assert.strictEqual(
            hash.encoded,
            '$argon2d$v=19$m=1024,t=1,p=1$c29tZXNhbHQ$kPOHk/DlE6du1nkbKKom8FV+fcNjviLW'
        );
    });

    it('should compute long hashes', async function () {
        const hash = await argon2.hash({
            pass: 'p@ssw0rd',
            salt: 'somesalt',
            hashLen: 100000,
        });
        assert.match(
            hash.encoded,
            /^\$argon2d\$v=19\$m=1024,t=1,p=1\$c29tZXNhbHQ\$A0myEnizYlgEZQ7gUkfNESi8\/.*\/2Zy0G7fzjEl\/bKA$/
        );
    });
});
