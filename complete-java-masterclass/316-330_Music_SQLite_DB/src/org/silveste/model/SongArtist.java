package org.silveste.model;

public class SongArtist {
    private String artisName;
    private String albumName;
    private int track;

    public String getArtisName() {
        return artisName;
    }

    public void setArtisName(String artisName) {
        this.artisName = artisName;
    }

    public String getAlbumName() {
        return albumName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }

    public int getTrack() {
        return track;
    }

    public void setTrack(int track) {
        this.track = track;
    }
}
