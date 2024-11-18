package com.stories.owl.domain.supaBase.services;

import com.harium.supabase.SupabaseClient;
import com.harium.supabase.storage.StorageAPI;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class SupabaseService {

    @Value("${SUPABASE_URL}")
    private String supabaseUrl;

    @Value("${SUPABASE_KEY}")
    private String supabaseKey;

//    private final SupabaseClient supabase;

//    public SupabaseService() {
//        this.supabase = new SupabaseClient(supabaseUrl, supabaseKey);
//    }

    public String saveImageToBucket( byte[] img, String name) throws IOException {
        SupabaseClient supabase = new SupabaseClient(
                supabaseUrl,
                supabaseKey);

        StorageAPI storageAPI = supabase.storage();

        String timestamp = String.valueOf(System.currentTimeMillis());
        String fileName = "story_images/" + name + "_" + timestamp + ".png";
        try {
            storageAPI.upload(fileName, img);
            System.out.println("the image was saved to supabase as: " +  fileName);
            return fileName;
        } catch (Exception e) {
            throw new IOException("Failed to upload image to Supabase bucket", e);
        }

    }
}
