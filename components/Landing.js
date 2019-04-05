import Link from 'next/link';

export default () => {
  return (
    <div className="landing">
      <h2>Welcome to the US Colleges Search App</h2>
      <Link href="/landing">
        <button>Get Started</button>
      </Link>

      <style jsx>{`
        .landing {
          position: absolute;
          background-image: url('https://unsplash.com/photos/vEgVWRBr2VY')
            no-repeat;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};
