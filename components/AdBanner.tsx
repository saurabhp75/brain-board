import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

const AndroidAdID = 'ca-app-pub-3781919071783284/3563617086';

const AdBanner = () => (
  <BannerAd
    unitId={AndroidAdID}
    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
    requestOptions={{
      requestNonPersonalizedAdsOnly: true,
      networkExtras: {
        collapsible: 'bottom',
      },
    }}
  />
);

export default AdBanner;
