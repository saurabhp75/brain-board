import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

const AdBanner = () => (
  <BannerAd
    unitId={TestIds.BANNER}
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
