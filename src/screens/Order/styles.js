const commonStyle = require("../../theme/variables/commonStyle");

export default {
  img: {
    height: 200,
    width: 200,
    borderRadius: 100,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: commonStyle.lightTextColor,
    marginTop: 70,
    marginBottom: 25
  },
  text: {
    textAlign: "center",
    color: commonStyle.contentTextColor,
    fontSize: 14
  },
  blogImage: {
    height: 200,
    width: null,
    flex: 1
  },
  blogTitleView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  blogTitleText: {
    backgroundColor: 'transparent',
    color: '#fff'
  },
  excerptText: {
    color: '#8b9393',
    fontSize: 12
  }
};
