export const CalenderTypes = theme => {
    return {
      _base: {
        container: {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4,
          paddingVertical: 8,
          paddingHorizontal: 12,
          overflow: "hidden",
          width: 228,
          height: 44
        },
        content: {
          fontSize: theme.fonts.sizes.base,
          alignSelf: "center",
          textAlign: "center"
        },
        image: {},
        loading: {
          color: theme.colors.button.text
        }
      },
    };
  };
  